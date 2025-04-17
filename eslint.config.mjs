import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import daStyle from 'eslint-config-dicodingacademy';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended', daStyle],
    languageOptions: { globals: globals.node }
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' }
  }
]);
