import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default tseslint.config(
	{ ignores: ['dist/', 'coverage/', 'node_modules/'] },

	js.configs.recommended,
	...tseslint.configs.recommended,
	...tseslint.configs.stylistic,

	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'no-console': [
				'warn',
				{
					allow: ['warn', 'error'],
				},
			],
		},
	},

	{
		files: ['**/*.vue'],

		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tseslint.parser,
				sourceType: 'module',
				ecmaVersion: 'latest',
				extraFileExtensions: ['.vue'],
			},
		},

		plugins: {
			vue,
		},

		extends: [...vue.configs['flat/recommended']],

		rules: {
			'vue/multi-word-component-names': 'off',
		},
	},

	{
		files: ['*.config.mjs', '*.config.ts', 'scripts/**/*'],
		languageOptions: {
			globals: {
				console: 'readonly',
				process: 'readonly',
			},
		},
	},

	prettier
);
