import { rm } from 'node:fs/promises';

const projectRoot = new URL('../', import.meta.url);

await Promise.all([
  rm(new URL('.next/', projectRoot), { recursive: true, force: true }),
  rm(new URL('next-env.d.ts', projectRoot), { force: true }),
]);

console.log('Removed stale Next.js generated types and build cache.');
