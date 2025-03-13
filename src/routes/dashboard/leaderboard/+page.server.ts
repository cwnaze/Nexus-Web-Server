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

    const leaderboard = await fetch('http://10.8.8.20:8000/leaderboard').then(res => res.json());

    for (let i = 0; i < leaderboard.length; i++) {
        leaderboard[i][0] = leaderboard[i][0] + " - " + leaderboard[i][1] + " points";
        leaderboard[i].splice(1, 1);
    }

    return { user_info: locals.user.user, leaderboard: leaderboard };
}