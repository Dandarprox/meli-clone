import fetch from 'node-fetch';
import { MELI_BASE_URL } from '../constants/api';

export function meliFetch(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
  const [url, init] = args;

  return fetch(`${MELI_BASE_URL}${url}`, init);
}