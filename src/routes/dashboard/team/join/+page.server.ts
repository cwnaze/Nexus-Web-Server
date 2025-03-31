import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PoolConnection } from 'mysql2/promise';
import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { createPool } from 'mysql2/promise'; // Ensure the pool is created properly

// Create a shared connection pool
const pool = createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/** @type {import('./$types').Actions} */

let cookie_info: any;

export async function load({ locals }) {
    if (!locals.user) {
        return redirect(302, '/login');
    }
    if (locals.user.user.team_name) {
        return redirect(302, '/dashboard/team/');
    }
    cookie_info = locals.user.user;
}

export const actions: Actions = {
    join_team: async ({ cookies, request }) => {
        const data: FormData = await request.formData();

        // Get all form data and assign to variables
        const t_name: string = data.get('team_name')?.toString() ?? '';
        const password: string = data.get('password')?.toString() ?? '';

        // Form validation
        if (t_name === '') return fail(400, { team_name_missing: true });
        if (password === '') return fail(400, { t_name, password_missing: true });

        let connection: PoolConnection | null = null; // Use PoolConnection type

        try {
            connection = await pool.getConnection();
            await connection.beginTransaction(); // Start transaction

            // Check if team exists
            const [team_result]: any = await connection.query(
                'SELECT team_name FROM team_info WHERE team_name = ?',
                [t_name]
            );
            if (team_result.length === 0) {
                await connection.rollback();
                return fail(400, { t_name, invalid_login: true });
            }

            // Check if the password is correct
            const [password_result]: any = await connection.query(
                'SELECT password FROM team_info WHERE team_name = ?',
                [t_name]
            );
            const hash_pass: string = createHash('sha512').update(password).digest('hex');
            if (
                password_result.length === 0 ||
                password_result[0].password.toString() !== hash_pass
            ) {
                await connection.rollback();
                return fail(400, { t_name, invalid_login: true });
            }

            // Lock the row of the current user to avoid concurrent modifications
            const [user_result]: any = await connection.query(
                'SELECT email, team_name FROM user_info WHERE email = ? FOR UPDATE',
                [cookie_info.email]
            );

            if (user_result.length === 0) {
                await connection.rollback();
                return fail(400, { error: 'User not found' });
            }

            // Check if the team is full
            const [team_members]: any = await connection.query(
                'SELECT first_name FROM user_info WHERE team_name = ?',
                [t_name]
            );
            if (team_members.length >= 4) {
                await connection.rollback();
                return fail(400, { t_name, team_full: true });
            }

            // Update user's team name
            await connection.query('UPDATE user_info SET team_name = ? WHERE email = ?', [
                t_name,
                cookie_info.email
            ]);

            // Commit the transaction
            await connection.commit();

            // Invalidate and create a new JWT token with updated team info
            cookies.delete('authToken', { path: '/' });
            const token: string = jwt.sign(
                {
                    user: {
                        email: cookie_info.email,
                        team_name: t_name,
                        first_name: cookie_info.first_name,
                        last_name: cookie_info.last_name
                    }
                },
                env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            cookies.set('authToken', token, {
                httpOnly: true,
                maxAge: 60 * 60,
                sameSite: 'strict',
                secure: false,
                path: '/'
            });

            throw redirect(302, '/dashboard/challenges');
        } catch (err) {
            console.error('Error joining team:', err);
            if (connection) await connection.rollback(); // Rollback on failure
            return fail(500, { error: 'Internal Server Error' });
        } finally {
            if (connection) {
                connection.release(); // Release the connection back to the pool
            }
        }
    }
};
