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
    const team_members: any = await db.query("SELECT first_name, last_name FROM user_info WHERE team_name = ?", [locals.user.user.team_name]);

    let total_points = 0;
    if(team_points[0].length != 0) {
        for(let i = 0; i < team_points[0].length; i++) {
            total_points+=team_points[0][i].points;
        }
    }
    let team_member_names = [];
    for (let i = 0; i < team_members[0].length; i++) {
        team_member_names.push(team_members[0][i].first_name + " " + team_members[0][i].last_name);
        console.log(team_member_names);
    }

    return { user_info: locals.user.user, team_points: total_points, team_members: team_member_names };
}