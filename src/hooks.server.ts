import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleClerk } from 'clerk-sveltekit/server';
import { CLERK_SECRET_KEY } from '$env/static/private';

const setUser: Handle = async ({ event, resolve }) => {
	try {
		const clerk_userId = event.locals.session.userId;
		const response = await fetch(`https://api.clerk.com/v1/users/${clerk_userId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${CLERK_SECRET_KEY}`
			}
		});
		const user = await response.json();
		event.locals.user = {
			userId: user.id,
			username: user.username,
			email: user.email_addresses[0].email_address,
			firstName: user.first_name,
			lastName: user.last_name,
			roles: []
		};
	} catch (error) {
		console.error(error);
	}
	return resolve(event);
};

export const handle: Handle = sequence(
	handleClerk(CLERK_SECRET_KEY, {
		debug: true,
		protectedPaths: ['/admin', '/student', '/teacher'],
		signInUrl: '/sign-in'
	}),
	setUser
);
