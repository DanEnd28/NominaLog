module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'eslint-config-prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react/no-string-refs': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},

	// importaciones config
	settings: {
		'import/resolver': {
			alias: {
				extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
				map: [
					['@src', './src',]
				]
			},
			typescript: {}
		}
	}
}
