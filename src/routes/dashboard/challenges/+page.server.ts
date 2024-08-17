import { redirect } from "@sveltejs/kit";
import { ConnectDb } from "$lib/server/mysql.js";
import type { Connection, FieldPacket, QueryResult } from "mysql2/promise";

export async function load({ locals }) {
    if(!locals.user) return redirect(302, '/login');

    const db: Connection = await ConnectDb();
    const challenge_info: any | FieldPacket = await db.query("SELECT ip_address,challenge_name FROM team_challenge WHERE team_name = ?", [locals.user.user.team_name]);
    const master_info: any | FieldPacket = [];
    for (let i = 0; i < challenge_info[0].length; i++) {
        var temp: any = await db.query("SELECT * FROM master_challenge WHERE challenge_name = ?", [challenge_info[0][i].challenge_name]);
        master_info.push(temp[0][0]);
    }

    return { user_info: locals.user.user, challenge_info: challenge_info[0], master_info: master_info };
}