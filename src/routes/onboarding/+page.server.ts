import { db } from '$lib/db/mongo';
import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { userSchema } from './schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const load: PageServerLoad = async ({ locals }) => {
	userSchema.default(locals.user);
	const clerk_userId = locals.session.userId;

	const user = await db('users').findOne({ clerk_userId });

	if (user) {
		if (user.onboarding) {
			return redirect(302, '/');
		}
		return { form: await superValidate(zod(userSchema)), user: locals.user };
	}

	const userId = nanoid();

	const response = await db('users').insertOne({ clerk_userId, userId: userId, onboarding: false });
	console.log(response);
	return { form: await superValidate(zod(userSchema)), user: locals.user };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(userSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		console.log(form.data);
		const response = await db('users').updateOne(
			{ clerk_userId: form.data.userId },
			{ $set: { ...form.data, onboarding: true, roles: ['Student'] } }
		);

		return redirect(302, '/');
	}
};
