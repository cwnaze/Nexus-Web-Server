import { redirect } from "@sveltejs/kit";

export function load({ locals }) {
    if(!locals.user) {
        return redirect(302, '/login');
    }
    if(!locals.user.user.team_name) {
        return redirect(302, '/dashboard/team/create')
    }
}