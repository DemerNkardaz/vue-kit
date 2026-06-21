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
			fileName: (_, entryName) => {
				return `${entryName}.mjs`;
			},
		},

		rollupOptions: {
			input: {
				index: resolve(__dirname, 'src/index.ts'),
				patterns: resolve(__dirname, 'src/components/patterns/index.ts'),
				primitives: resolve(__dirname, 'src/components/primitives/index.ts'),
			},

			external: ['vue'],

			output: {
				exports: 'named',

				entryFileNames: (chunk) => {
					if (chunk.name === 'index') return 'index.mjs';
					if (chunk.name === 'patterns') return 'components/patterns/index.mjs';
					if (chunk.name === 'primitives') return 'components/primitives/index.mjs';

					return '[name].mjs';
				},
			},
		},

		sourcemap: true,
		emptyOutDir: true,
		target: 'es2022',
	},
});
