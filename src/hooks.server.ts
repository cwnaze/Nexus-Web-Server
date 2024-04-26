import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {
    const authToken = event.cookies.get('authToken');
    try {
        if (!authToken) event.locals.user = undefined;
        else {
            const decoded = jwt.verify(authToken, env.JWT_SECRET);
            if (!decoded) event.locals.user = undefined;
            else {
                console.log(decoded);
                event.locals.user = decoded;
            }
        }
    }
    finally {
        return await resolve(event);
    }
}
