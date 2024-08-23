import { fail, redirect, type Actions } from '@sveltejs/kit';
import { ConnectDb } from '$lib/server/mysql';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { createHash } from 'crypto';
import type { Connection, FieldPacket } from 'mysql2/promise';

/** @type {import('./$types').Actions} */

var cookie_info: any;

export async function load({ locals }) {
    if(locals.user.user.team_name) return redirect(302, '/dashboard/team');
    if(!locals.user) return redirect(302, '/login');
    cookie_info = locals.user.user;
}

export const actions: Actions = {
    create_team: async ({ cookies, request }) => {
        const data: FormData = await request.formData();
        const team_name: string = data.get('team-name')?.toString() ?? '';
        const password: string = data.get('password')?.toString() ?? '';
        const confirm_password: string = data.get('confirm-password')?.toString() ?? '';

        const db: Connection = await ConnectDb();

        if (team_name === '') return fail(400, {team_name, team_name_missing: true});
        if (password === '') return fail(400, {team_name, password_missing: true});
        if (confirm_password === '') return fail(400, {team_name, confirm_password_missing: true});
        const team_name_check = await db.query("SELECT team_name FROM team_info WHERE team_name = ?", [team_name]);
        if (team_name_check[0].toString().length > 0) return fail(400, {team_name, team_name_exists: true});
        if (password !== confirm_password) return fail(400, {team_name, password_mismatch: true});

        await db.query("UPDATE user_info SET team_name = (?) WHERE email = (?)", [team_name, cookie_info.email]);
        const hashed_pass = createHash('sha512').update(password).digest('hex');
        await db.query("INSERT INTO team_info (team_name, password) VALUES (?, ?)", [team_name, hashed_pass]);
        cookies.delete('authToken', {path: '/'});
        const token: string = jwt.sign({user: {email: cookie_info.email, team_name: team_name, first_name: cookie_info.first_name, last_name: cookie_info.last_name}}, env.JWT_SECRET, {expiresIn: '1h'});
        cookies.set('authToken', token, {httpOnly: true, maxAge: 60 * 60, sameSite: 'strict', secure: false, path: '/'});
        throw redirect(302, '/dashboard/challenges');
    }  
}