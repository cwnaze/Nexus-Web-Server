import { redirect } from "@sveltejs/kit";
import { ConnectDb } from '$lib/server/mysql';
import type { Connection } from 'mysql2/promise';


export async function load({ locals }) {
    if(!locals.user) {
        return redirect(302, '/login');
    }
    if(!locals.user.user.team_name) {
        return redirect(302, '/dashboard/team/create')
    }

    const db: Connection = await ConnectDb();
    const team_points: any = await db.query("SELECT points FROM solved WHERE team_name = ?", [locals.user.user.team_name]);
    let total_points = 0;
    if(team_points[0].length != 0) {
        for(let i = 0; i < team_points[0].length; i++) {
            total_points+=team_points[0][i].points;
        }
    }

    return { user_info: locals.user.user, team_points: total_points };
}