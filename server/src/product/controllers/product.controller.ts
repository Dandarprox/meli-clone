import { Request, Response } from 'express';
import { z } from 'zod';
import productService from '../services/product.service';

const Query = z.object({
  q: z.string().optional(),
  limit: z.coerce.number().optional().default(50),
});

export default {
  async getProducts(req: Request, res: Response) {
    const { q: query, limit } = Query.parse(req.query);

    if (!query) {
      return res.status(400).send([]);
    }

    const products = await productService.listProducts(query, limit);

    return res.status(200).send(products);
  },

  async getProductDetail(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send([]);
    }

    const product = await productService.getProductDetail(id);

    return res.status(200).send(product);
  }
}