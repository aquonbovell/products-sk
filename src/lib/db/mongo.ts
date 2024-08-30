import { MONGO_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGO_URI);

export async function connect(): Promise<void> {
	await client.connect();
}

export async function disconnect(): Promise<void> {
	await client.close();
}

export function db(name: string) {
	return client.db('auth_users').collection(name);
}
