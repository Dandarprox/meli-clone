import { Request, Response } from "express";
import { z } from "zod";
import productService from "../services/product.service";

const Query = z.object({
	q: z.string().optional(),
	limit: z.coerce.number().optional().default(50),
});

interface ProductController {
	getProducts(req: Request, res: Response): Promise<Response>;
	getProductDetail(req: Request, res: Response): Promise<Response>;
}

interface Error {
	success: boolean;
	error?: string;
	data?: unknown;
}

export default {
	async getProducts(req: Request, res: Response) {
		const { q: query, limit } = Query.parse(req.query);

		if (!query) {
			return res.status(400).send({
				success: false,
				error: "Query is required",
			} satisfies Error);
		}

		try {
			const products = await productService.listProducts(query, limit);

			return res.status(200).send({
				success: true,
				data: products,
			} satisfies Error);
		} catch (error) {
			return res.status(500).send({
				success: false,
				error: "Internal server error",
			});
		}
	},

	async getProductDetail(req: Request, res: Response) {
		const { id } = req.params;

		if (!id) {
			return res.status(400).send({
				success: false,
				error: "Id is required",
			} satisfies Error);
		}

		try {
			const product = await productService.getProductDetail(id);

			return res.status(200).send({
				success: true,
				data: product,
			} satisfies Error);
		} catch (error) {
			return res.status(500).send({
				success: false,
				error: "Internal server error",
			} satisfies Error);
		}
	},
} satisfies ProductController;
