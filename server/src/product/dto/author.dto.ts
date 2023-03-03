import { z } from 'zod';

export const AuthorDto = z.object({
  name: z.string(),
  lastname: z.string(),
});

export type AuthorDto = z.infer<typeof AuthorDto>;