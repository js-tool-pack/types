module.exports = {
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 标签的反尖括号需要换行
  bracketSameLine: true,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 使用默认的折行标准 不会更改 markdown 文本中的换行
  proseWrap: 'preserve',
  // 尾随逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  rangeEnd: Infinity,
  // 使用单引号
  singleQuote: true,
  // 换行符使用 auto
  endOfLine: 'auto',
  // 一行最多 100 字符
  printWidth: 100,
  // 不使用缩进符使用空格
  useTabs: false,
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 行尾需要有分号
  semi: true,
};
