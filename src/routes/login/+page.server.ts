import { ConnectDb } from '$lib/server/mysql';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { Connection, FieldPacket } from 'mysql2/promise';
import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').Actions} */

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data: FormData = await request.formData();

        //get all form data and assign to variables
        const email: string = data.get('email')?.toString() ?? '';
        const password: string = data.get('password')?.toString() ?? '';

        const db: Connection = await ConnectDb();

        //form validation
        if (email === '') return fail(400, {email_missing: true});
        if (password === '') return fail(400, {email, password_missing: true});

        const db_email = await db.query("SELECT email FROM user_info WHERE email = ?", [email]);
        if (db_email[0].toString().length === 0) return fail(400, {email, invalid_login: true});

        const db_pass: [any, FieldPacket[]] = await db.query("SELECT password FROM user_info WHERE email = ?", [email]);
        const hash_pass: string = createHash('sha512').update(password).digest('hex');
        if (db_pass[0][0].password.toString() !== hash_pass) return fail(400, {email, invalid_login: true});

        // create JWT token
        const user: [any, FieldPacket[]] = await db.query("SELECT email, team_name, first_name, last_name FROM user_info WHERE email = ?", [email]);
        const token: string = jwt.sign({user: user[0][0]}, env.JWT_SECRET, {expiresIn: '1h'});
        cookies.set('authToken', token, {httpOnly: true, maxAge: 60 * 60, sameSite: 'strict', secure: false, path: '/'});
        throw redirect(302, '/dashboard');
    }
};