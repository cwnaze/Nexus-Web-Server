import { redirect } from "@sveltejs/kit";
import { ConnectDb } from "$lib/server/mysql.js";
import type { Connection, FieldPacket } from "mysql2/promise";

export async function load({ locals }) {
    if(!locals.user) return redirect(302, '/login');

    const db: Connection = await ConnectDb();
    const challenge_info: any | FieldPacket = await db.query("SELECT ip_address,challenge_name FROM team_challenge WHERE team_name = ?", [locals.user.user.team_name]);
    const master_info: any | FieldPacket = await db.query("SELECT * FROM master_challenge");
    console.log(master_info[0]);
    return { user_info: locals.user.user, challenge_info: challenge_info[0], master_info: master_info[0] };
}