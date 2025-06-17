import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactlint from 'eslint-plugin-react'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ],
    files: ['**/*.{js,jsx,ts,tsx}'],//记得这里一定要启用js,jsx否则不生效
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
     
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': reactlint//这里添加eslint-react插件
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
//依赖eslint-plugin-react
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx",".ts",".tsx"] }],// 允许在.js文件中写JSX（关键！）,但是启用vscode的eslint插件还是会提示语法错误，只能关掉vscode的eslint插件
    },
  },
)
