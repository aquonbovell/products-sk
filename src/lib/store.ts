import { writable } from 'svelte/store';
type Product = {
	id: string;
	brand: string;
	category: string;
	description: string;
	dimensions: {
		depth: number;
		width: number;
		height: number;
	};
	discountPercentage: number;
};
export const Products = writable<Product[]>([]);
