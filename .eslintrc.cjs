module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest": true
    },
    // 指定如何解析语法
    "parser": 'vue-eslint-parser',
    // 优先级低于parse的语法解析配置
    "parserOptions": {
        "ecmaVersion": 'latest',
        "sourceType": 'module',
        "parser": '@typescript-eslint/parser',
        "jsxPragma": 'React',
        "ecmaFeatures": {
            "jsx": true,
        }
    },
    // 继承已有的规则
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended",
        // "plugin:prettier/recommended"
    ],
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
        "no-var": "error", // 要求使用let 或 const 而不是var
        "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
        "no-console": process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "no-debugger": process.env.NODE_ENV === 'prodection' ? 'error' : 'off',
        "no-unexpected-multiline": 'error',//禁止空余的多行
        "no-useless-escape": 'off', // 禁止不必要的转义字符

        "@typescript-eslint/no-unused-vars": 'off', // 禁止定义未使用的变量
        // "@typescript-eslint/perfer-ts-expect-error": 'error',
        "@typescript-eslint/no-explicit-any": 'off',//禁止使用any类型
        "@typescript-eslint/no-non-assertion": 'off',
        "@typescript-eslint/no-namespace": 'off', // 禁止使用自定义 TypeScript 模块和命名空间
        "@typescript-eslint/semi": 'off',
        "@typescript-eslint/ban-ts-comment": "off", // 关闭 @ts-ignore 标红

        "vue/multi-word-component-names": "off", //关闭组件命名规则
        "vue/script-setup-uses-vars": 'error', // 防止<script setup>使用的变量<template>被标记为未使用
        "vue/no-mutating-props": 'off',// 不允许组件 prop 的改变
        "vue/attribute-hyphenation": 'off', // 对模板中的自定义组件强制执行属性命名样式
    }
}
