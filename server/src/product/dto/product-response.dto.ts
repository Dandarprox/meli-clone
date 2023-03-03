import { z } from 'zod';
import { AuthorDto } from './author.dto';

export const ProductItemDto = z.object({
  id: z.string(),
  title: z.string(),
  price: z.object({
    currency: z.string(),
    amount: z.number(),
    decimals: z.number(),
  }),
  picture: z.string(),
  condition: z.string(),
  free_shipping: z.boolean(),
  sold_quantity: z.number(),
  description: z.string(),
  category_path: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).optional()
});

export const ProductResponseDto = z.object({
  author: AuthorDto,
  item: ProductItemDto,
});

export type ProductItemDto = z.infer<typeof ProductItemDto>;
export type ProductResponseDto = z.infer<typeof ProductResponseDto>;
