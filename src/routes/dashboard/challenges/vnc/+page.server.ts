import { redirect } from "@sveltejs/kit";

export const ssr = false;

export async function load({ locals }) {
    if(!locals.user) return redirect(302, '/login');
}