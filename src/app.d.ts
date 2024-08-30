// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: {
				userId: string;
			};
			user: {
				userId: string;
				username: string;
				email: string;
				firstName: string;
				lastName: string;
				roles: string[];
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
