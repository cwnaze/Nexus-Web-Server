import { ConnectDb } from '$lib/server/mysql';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { Connection, FieldPacket } from 'mysql2/promise';
import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').Actions} */

let cookie_info: any;

export async function load({ locals }) {
    if(!locals.user) return redirect(302, '/login');
    cookie_info = locals.user.user;
}

export const actions: Actions = {
    join_team: async ({ cookies, request }) => {
        const data: FormData = await request.formData();

        //get all form data and assign to variables
        const t_name: string = data.get('team_name')?.toString() ?? '';
        const password: string = data.get('password')?.toString() ?? '';

        const db: Connection = await ConnectDb();

        //form validation
        if (t_name === '') return fail(400, {email_missing: true});
        if (password === '') return fail(400, {t_name, password_missing: true});

        const db_email = await db.query("SELECT team_name FROM team_info WHERE team_name = ?", [t_name]);
        if (db_email[0].toString().length === 0) return fail(400, {t_name, invalid_login: true});

        const db_pass: [any, FieldPacket[]] = await db.query("SELECT password FROM team_info WHERE team_name = ?", [t_name]);
        const hash_pass: string = createHash('sha512').update(password).digest('hex');
        if (db_pass[0][0].password.toString() !== hash_pass) return fail(400, {t_name, invalid_login: true});

        await db.query("UPDATE user_info SET team_name = (?) WHERE email = (?)", [t_name, cookie_info.email]);

        // create JWT token
        cookies.delete('authToken', {path: '/'});
        const token: string = jwt.sign({user: {email: cookie_info.email, team_name: t_name, first_name: cookie_info.first_name, last_name: cookie_info.last_name}}, env.JWT_SECRET, {expiresIn: '1h'});
        cookies.set('authToken', token, {httpOnly: true, maxAge: 60 * 60, sameSite: 'strict', secure: false, path: '/'});
        throw redirect(302, '/dashboard/challenges');
    }
};