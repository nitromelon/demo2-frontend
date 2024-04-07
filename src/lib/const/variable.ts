import { writable, type Writable } from 'svelte/store';

export const backend_url = 'http://localhost:8080';
export const user_valid = writable(false);
export const email: Writable<string | null> = writable(null);
export const user_hash_password: Writable<string | null> = writable(null);
export const target: Writable<'admin' | 'user' | 'productmanager' | 'shoppingcartmanager'> =
	writable('user');
