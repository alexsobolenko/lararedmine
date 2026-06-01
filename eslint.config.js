import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    {
        ignores: [
            'node_modules/**',
            'public/build/**',
            'vendor/**',
        ],
    },
    js.configs.recommended,
    {
        files: ['resources/js/**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                sourceType: 'module',
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            indent: [
                'error',
                4,
                {
                    SwitchCase: 1,
                    ArrayExpression: 1,
                    ObjectExpression: 1,
                },
            ],
            'no-tabs': [0, {allowIndentationTabs: true}],
            'no-console': 'off',
            'max-len': ['warn', 200],
            'array-bracket-spacing': ['error', 'never'],
            'array-callback-return': 'error',
            'arrow-parens': ['error', 'always'],
            'arrow-spacing': ['error', {before: true, after: true}],
            'brace-style': ['error', '1tbs'],
            'comma-dangle': ['error', 'always-multiline'],
            'comma-spacing': ['error', {before: false, after: true}],
            'key-spacing': ['error', {beforeColon: false, afterColon: true}],
            'linebreak-style': 'off',
            'new-cap': 'off',
            'newline-before-return': 'error',
            'no-array-constructor': 'error',
            'no-const-assign': 'error',
            'no-duplicate-imports': 'error',
            'no-multi-assign': 'error',
            'no-multiple-empty-lines': 'error',
            'no-new-object': 'error',
            'no-unreachable': 'error',
            'no-unneeded-ternary': 'error',
            'no-unused-vars': 'off',
            'no-useless-constructor': 'error',
            'nonblock-statement-body-position': ['error', 'beside'],
            'object-curly-spacing': ['error', 'never'],
            'object-shorthand': 'error',
            'one-var': ['error', 'never'],
            'operator-linebreak': ['error', 'before', {overrides: {'&&': 'after'}}],
            'padded-blocks': ['error', 'never'],
            'prefer-const': 'error',
            'prefer-destructuring': ['error', {object: true, array: true}],
            'prefer-promise-reject-errors': 'off',
            'prefer-template': 'error',
            'quote-props': ['error', 'as-needed'],
            quotes: ['error', 'single', {
                avoidEscape: true,
                allowTemplateLiterals: true,
            }],
            'require-jsdoc': 'off',
            semi: ['error', 'always'],
            'space-before-blocks': ['error', 'always'],
            'space-in-parens': ['error', 'never'],
            'template-curly-spacing': ['error', 'never'],
            'space-before-function-paren': [
                'error',
                {
                    named: 'never',
                    anonymous: 'always',
                    asyncArrow: 'always',
                },
            ],
            'react/jsx-boolean-value': ['error', 'never'],
            'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
            'react/jsx-closing-tag-location': 'error',
            'react/jsx-curly-brace-presence': ['error', {
                props: 'never',
                children: 'never',
            }],
            'react/jsx-curly-spacing': ['error', {
                when: 'never',
                children: true,
            }],
            'react/jsx-equals-spacing': ['error', 'never'],
            'react/jsx-first-prop-new-line': ['error', 'multiline'],
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/jsx-max-props-per-line': [
                'error',
                {
                    maximum: {
                        single: 10,
                        multi: 1,
                    },
                },
            ],
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-useless-fragment': 'error',
            'react/jsx-pascal-case': 'error',
            'react/jsx-props-no-multi-spaces': 'error',
            'react/jsx-tag-spacing': ['error', {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
                beforeClosing: 'never',
            }],
            'react/jsx-wrap-multilines': ['error', {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                arrow: 'parens-new-line',
                condition: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
            }],
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/self-closing-comp': 'error',
            'react-refresh/only-export-components': 'off',
        },
    },
];
