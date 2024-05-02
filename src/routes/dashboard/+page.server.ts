import { redirect } from "@sveltejs/kit";

export function load({ locals }) {
    return redirect(302, '/dashboard/challenges');
}