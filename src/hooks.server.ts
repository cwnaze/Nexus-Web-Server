import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {
    const token = event.cookies.get('authToken');
    try{
        if(!token) event.locals.user = undefined;
    }
} 