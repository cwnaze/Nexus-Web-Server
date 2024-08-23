import { redirect } from "@sveltejs/kit";

export function load({ locals }) {
    if(!locals.user.user.team_name) {
        return redirect(302, '/dashboard/team/create');
    }
    return redirect(302, '/dashboard/challenges');
}