import { defineConfig } from 'vite';
import svelte from '@svitejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/js',
	plugins: [svelte()]
});
