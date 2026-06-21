import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
	plugins: [vue()],

	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'VueKit',
			formats: ['es'],
			fileName: () => 'index.mjs',
		},

		rollupOptions: {
			external: ['vue'],
			output: {
				exports: 'named',
			},
		},

		sourcemap: true,
		emptyOutDir: true,
		target: 'es2022',
	},
});
