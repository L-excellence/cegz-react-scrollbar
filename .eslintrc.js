// .eslintrc.js
module.exports = {
  env: {
    // 指定代码的运行环境
    browser: true,
    es6: true,
  },
  // 使用 eslint-plugin-react 插件时需要指定 React 版本
  settings: {
    react: {
      version: "18", // or "detect"
    },
  },
  extends: ["plugin:react/recommended"],
  plugins: ["react", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest", // 支持 ES 最新版本的语法校验
    sourceType: "module", // 设置 ECMAScript modules
  },
  // rules: https://eslint.bootcss.com/docs/rules/
  rules: {
    // 禁止出现定义了，但未使用过的变量（使用 ts 的规则来校验）
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    // 阻止 var 的使用，推荐用 let 和 const
    "no-var": "warn",
    // 运算符前后需要空格，如：let a = 12;
    "space-infix-ops": "error",
    // 对象 key 和 value 之间有空格，如：key: value
    "key-spacing": "error",
    // 强制在大括号中使用一致的空格，空{}除外。如：{ a: 1 } 符合，{ a: 1} 不符合
    "object-curly-spacing": ["error", "always"],
    // 逗号前后是否需要空格，如：let arr = [1, 2, 3];
    "comma-spacing": "error",
    // 强制所有控制语句使用一致的括号风格，影响 if，for，while 等的花括号风格；这里允许写在一行，要换行必须有花括号
    curly: ["error", "multi-line"],
    // 强制在关键字前后使用一致的空格，如：if / else 关键字空格保持一致
    "keyword-spacing": "error",
    // 禁止在条件语句中出现赋值操作符，如：if (user.jobTitle = "manager")
    "no-cond-assign": ["error", "except-parens"],
    // 禁止对象字面量中出现重复的 key
    "no-dupe-keys": "error",
    // 禁止出现重复的 case 标签
    "no-duplicate-case": "error",
    // 要求使用 === 和 !==，禁用（== 和 !=）
    eqeqeq: ["error", "always", { null: "ignore" }],
    // 禁止出现多个空格。如：if (key   !== key2) {}
    "no-multi-spaces": "error",
    // 禁止重新声明变量。如：var a = 3;、var a = 10;
    "no-redeclare": "error",
    // 强制在 JSX 属性中使用一致的双引号。如：<div className="box">Box</div>
    "jsx-quotes": ["error", "prefer-double"],
    // 要求箭头函数的箭头之前或之后有空格。如：const fn = () => {}
    "arrow-spacing": "error",
    // ESModule 禁止重复导入。
    "no-duplicate-imports": "error",
    // JSX 元素上不能定义重复的 Prop
    "react/jsx-no-duplicate-props": "error",
    // 在一组数组中元素必须定义 key 属性
    "react/jsx-key": "error",
    // 禁用不必要分号（重复使用多个）
    "no-extra-semi": "warn",
    // 防止在 React 组件定义中丢失 props 类型定义
    "react/prop-types": "off",
    // 禁止不使用 setState 的方式去更新 state，而是直接去赋值 state
    "react/no-direct-mutation-state": "off",
    // 禁止使用 string 类型的 ref 绑定 DOM 元素实例
    "react/no-string-refs": "off",
    // 允许编写未命名的组件，如 (props) => {}
    "react/display-name": "off",
    // 关闭 禁止空格和 tab 的混合缩进
    "no-mixed-spaces-and-tabs": "off",
    // 统一缩进（2个空格）
    // "indent": ["error", 2, { "SwitchCase": 1 }],
    "@typescript-eslint/indent": ["error", 2, { SwitchCase: 1 }],
  },
};
