/** @type {import('./$types').Actions} */
import { ConnectDb } from '$lib/server/mysql.js';

export const actions = {
    register: async ({ request }) => {
        const data: FormData = await request.formData();
        console.log(ConnectDb());
    }
};