import { redirect } from "@sveltejs/kit";

export const ssr = false;

export function load({ locals }) {
    if(!locals.user) return redirect(302, '/login');
}


