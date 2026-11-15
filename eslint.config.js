import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: ['dist', 'dist-ssr', 'node_modules', '.tools.nosync', 'assets-source', 'reports', '.lighthouseci', 'src/components/ui'],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['lighthouserc.cjs'],
    languageOptions: { globals: { module: 'writable' } },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
)
