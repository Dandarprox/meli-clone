import { z } from 'zod';

const envSchema = z.object({
  SERVER_PORT: z.string(),
})

type envType = z.infer<typeof envSchema>;
type envKeys = keyof envType;

export function getRequiredEnvVar<T extends envKeys>(key: T): envType[T] {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value as unknown as envType[T];
}