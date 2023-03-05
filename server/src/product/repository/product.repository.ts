import { meliFetch } from "../../configs/fetch";

interface ProductRepository {
	getProducts(query: string, limit: number): Promise<unknown[]>;
	getProductDetail(id: string): Promise<unknown>;
	getProductDescription(id: string): Promise<unknown>;
	getProductCategory(categoryId: string): Promise<unknown>;
}

export default {
	async getProducts(query: string, limit: number): Promise<unknown[]> {
		const searchParams = new URLSearchParams({
			q: query,
			limit: limit.toString(),
		});
		const response = await meliFetch(`/sites/MLA/search?q=${searchParams}`);

		if (!response.ok) {
			throw new Error("Error fetching products");
		}

		const { results }: { results: unknown } = await response.json();

		if (!Array.isArray(results)) {
			throw new Error("Error fetching products");
		}

		return results;
	},

	async getProductDetail(id: string): Promise<unknown> {
		const response = await meliFetch(`/items/${id}`);

		if (!response.ok) {
			throw new Error("Error fetching product detail");
		}

		return response.json();
	},

	async getProductDescription(id: string): Promise<unknown> {
		const response = await meliFetch(`/items/${id}/description`);

		if (!response.ok) {
			throw new Error("Error fetching product description");
		}

		return response.json();
	},

	async getProductCategory(categoryId: string): Promise<unknown> {
		const response = await meliFetch(`/categories/${categoryId}`);

		if (!response.ok) {
			throw new Error("Error fetching product category");
		}

		return response.json();
	},
} satisfies ProductRepository;
