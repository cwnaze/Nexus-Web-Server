import { ConnectDb } from '$lib/server/mysql.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { Connection } from 'mysql2/promise';
import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').Actions} */

export const actions: Actions = {
    register: async ({ cookies, request }) => {
        const data: FormData = await request.formData();

        //get all form data and assign to variables
        const f_name: string = data.get('first-name')?.toString() ?? '';
        const l_name: string = data.get('last-name')?.toString() ?? '';
        const t_name: string = data.get('team-name')?.toString() ?? '';
        const email: string = data.get('email')?.toString() ?? '';
        const password: string = data.get('password')?.toString() ?? '';
        const confirm_password: string = data.get('confirm-password')?.toString() ?? '';

        const db: Connection = await ConnectDb();

        //form validation
        if (f_name === '') return fail(400, {l_name, t_name, email, f_name_missing: true});
        if (l_name === '') return fail(400, {f_name, t_name, email, l_name_missing: true});
        if (t_name === '') return fail(400, {f_name, l_name, email, t_name_missing: true});
        if (email === '') return fail(400, {f_name, l_name, t_name, email_missing: true});
        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) return fail(400, {f_name, l_name, t_name, email, email_invalid: true});
        const db_email = await db.query("SELECT email FROM user_info WHERE email = ?", [email]);
        if (db_email[0].toString().length > 0) return fail(400, {f_name, l_name, t_name, email, email_exists: db_email.toString()});
        if (password === '') return fail(400, {f_name, l_name, t_name, email, password_missing: true});
        if (password.length < 8) return fail(400, {f_name, l_name, t_name, email, password_invalid: true});
        if (password !== confirm_password) return fail(400, {f_name, l_name, t_name, email, password_mismatch: true});

        const hash_pass: string = createHash('sha512').update(password).digest('hex');

        await db.query("INSERT INTO user_info (email, team_name, last_name, first_name, password) VALUES (?, ?, ?, ?, ?)", [email, t_name, l_name, f_name, hash_pass]);

        const token: string = jwt.sign({user: {email: email, team_name: t_name, first_name: f_name, last_name: l_name}}, env.JWT_SECRET, {expiresIn: '1h'});
        cookies.set('authToken', token, {httpOnly: true, maxAge: 60 * 60, sameSite: 'strict', secure: false, path: '/'});
        throw redirect(302, '/dashboard/challenges');
    }
};