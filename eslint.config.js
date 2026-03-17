import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // Updated to include js and jsx for the current project files
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // ═══════════════════════════════════════════════════════════════
      // ⚛️ REACT SPECIFIC RULES
      // ═══════════════════════════════════════════════════════════════

      // React Hooks rules (essential for proper hooks usage)
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Prefer single quotes in JSX
      'jsx-quotes': ['error', 'prefer-single'],

      // ═══════════════════════════════════════════════════════════════
      // 🎨 FORMATTING & STYLE RULES (2-space indentation)
      // ═══════════════════════════════════════════════════════════════

      // Enforces 2-space indentation consistently
      indent: [
        'error',
        2,
        {
          SwitchCase: 1, // Indent case statements
          VariableDeclarator: 1, // Indent variable declarations
          outerIIFEBody: 1, // Indent outer IIFE body
          MemberExpression: 1, // Indent chained method calls
          FunctionDeclaration: { parameters: 1, body: 1 },
          FunctionExpression: { parameters: 1, body: 1 },
          CallExpression: { arguments: 1 },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          ignoredNodes: [
            'JSXElement',
            'JSXElement > *',
            'JSXAttribute',
            'JSXIdentifier',
            'JSXNamespacedName',
            'JSXMemberExpression',
            'JSXSpreadAttribute',
            'JSXExpressionContainer',
            'JSXOpeningElement',
            'JSXClosingElement',
            'JSXFragment',
            'JSXOpeningFragment',
            'JSXClosingFragment',
            'JSXText',
            'JSXEmptyExpression',
            'JSXSpreadChild',
          ],
          ignoreComments: false,
        },
      ],

      // Use single quotes everywhere for consistency
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true, // Allow double quotes to avoid escaping
          allowTemplateLiterals: true, // Allow template literals
        },
      ],

      // Always require semicolons for clarity
      semi: ['error', 'always'],

      // Require trailing commas in multi-line structures (easier diffs)
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],

      // Consistent spacing inside objects: { key: value }
      'object-curly-spacing': ['error', 'always'],

      // No spacing inside arrays: [1, 2, 3]
      'array-bracket-spacing': ['error', 'never'],

      // Space before blocks: if (true) { ... }
      'space-before-blocks': 'error',

      // Space around keywords: if (...), for (...), etc.
      'keyword-spacing': ['error', { before: true, after: true }],

      // Spaces around operators: a + b, x = y
      'space-infix-ops': 'error',

      // Space before function parentheses
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always', // function () {}
          named: 'never', // function name() {}
          asyncArrow: 'always', // async () => {}
        },
      ],

      // Require newline at end of file
      'eol-last': ['error', 'always'],

      // No trailing whitespace
      'no-trailing-spaces': 'error',

      // Control empty lines (max 2 consecutive, none at end)
      'no-multiple-empty-lines': [
        'error',
        {
          max: 2,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],

      // Consistent brace style
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],

      // Comma spacing: [a, b, c] not [a,b,c]
      'comma-spacing': ['error', { before: false, after: true }],

      // Key spacing in objects: { key: value }
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],

      // ═══════════════════════════════════════════════════════════════
      // 🔧 TYPESCRIPT SPECIFIC RULES
      // ═══════════════════════════════════════════════════════════════

      // Warn about unused variables, but allow unused params with _
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Don't require explicit return types (inferred types are fine)
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Don't require explicit types for exported functions
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Warn about 'any' type usage (should be avoided)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Prefer interface over type when possible
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // Use consistent type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      // ═══════════════════════════════════════════════════════════════
      // 🚀 MODERN JAVASCRIPT BEST PRACTICES
      // ═══════════════════════════════════════════════════════════════

      // Prefer const over let when variable isn't reassigned
      'prefer-const': 'error',

      // No var declarations (use const/let)
      'no-var': 'error',

      // Use object shorthand: { name } instead of { name: name }
      'object-shorthand': 'error',

      // Prefer template literals over string concatenation
      'prefer-template': 'error',

      // Prefer arrow functions for callbacks
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],

      // Prefer destructuring when possible
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],

      // Use rest parameters instead of arguments
      'prefer-rest-params': 'error',

      // Use spread operator instead of .apply()
      'prefer-spread': 'error',

      // No empty functions (usually indicates incomplete code)
      'no-empty-function': 'error',

      // No magic numbers (use named constants)
      'no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1, 2],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          detectObjects: false,
        },
      ],

      // No nested ternary operators (hard to read)
      'no-nested-ternary': 'error',

      // No unnecessary return await
      'no-return-await': 'error',

      // No self-comparison (likely a bug)
      'no-self-compare': 'error',

      // No unused expressions
      'no-unused-expressions': 'error',

      // Require radix parameter in parseInt()
      radix: 'error',

      // ═══════════════════════════════════════════════════════════════
      // 📦 IMPORT/EXPORT RULES
      // ═══════════════════════════════════════════════════════════════

      // Sort imports alphabetically (helps with organization)
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],

      // No useless path segments in imports
      'no-useless-path-segments': 'off', // Not available in ESLint core

      // ═══════════════════════════════════════════════════════════════
      // 🎯 COMPLEXITY & MAINTAINABILITY
      // ═══════════════════════════════════════════════════════════════

      // Limit cyclomatic complexity
      complexity: ['warn', { max: 10 }],

      // Limit nesting depth
      'max-depth': ['warn', { max: 4 }],

      // Limit function parameters
      'max-params': ['warn', { max: 4 }],

      // ═══════════════════════════════════════════════════════════════
      // 🎨 NAMING CONVENTIONS
      // ═══════════════════════════════════════════════════════════════

      // Use camelCase for variables and functions
      camelcase: [
        'error',
        {
          properties: 'always',
          ignoreDestructuring: false,
          ignoreImports: false,
          ignoreGlobals: false,
        },
      ],

      // ═══════════════════════════════════════════════════════════════
      // 📏 LINE LENGTH CONTROL
      // ═══════════════════════════════════════════════════════════════

      // Enforce maximum line length (WARNING: Cannot auto-fix)
      'max-len': [
        'error',
        {
          code: 100, // Max characters per line
          tabWidth: 2, // Tab width for calculation
          ignoreUrls: true, // Ignore long URLs
          ignoreStrings: true, // Ignore long strings
          ignoreTemplateLiterals: true, // Ignore template literals
          ignoreRegExpLiterals: true, // Ignore regex
          ignoreComments: false, // Check comments too
          ignoreTrailingComments: true, // Ignore end-of-line comments
          ignorePattern: '^\\s*<.*>.*</.*>$', // Ignore JSX one-liners
        },
      ],
    },
  },
);
