import type { IMarkdownProps } from '@yozora/react-gfm'

export const editorCode = `interface Greeting {
  name: string
  language: 'zh' | 'en'
}

function greet({ name, language }: Greeting): string {
  return language === 'zh' ? \`你好，\${name}\` : \`Hello, \${name}\`
}

console.log(greet({ name: 'Yozora', language: 'zh' }))`

export const markdownSamples = {
  gfm: createMarkdown('gfm'),
  'gfm-ex': createMarkdown('gfm-ex'),
  yozora: createMarkdown('yozora'),
}

function createMarkdown(preset: 'gfm' | 'gfm-ex' | 'yozora'): IMarkdownProps['ast'] {
  const extended = preset !== 'gfm'
  const ast = {
    type: 'root' as const,
    children: [
      {
        type: 'heading',
        depth: 2,
        identifier: 'typography',
        children: [{ type: 'text', value: '文字、链接与排版' }],
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value:
              '一段用于检查中英文混排的文字。Yozora renders Markdown as React components，支持 ',
          },
          { type: 'strong', children: [{ type: 'text', value: '粗体' }] },
          { type: 'text', value: '、' },
          { type: 'emphasis', children: [{ type: 'text', value: '强调' }] },
          ...(extended
            ? [
                { type: 'text', value: '、' },
                { type: 'delete', children: [{ type: 'text', value: '删除线' }] },
              ]
            : []),
          { type: 'text', value: '，以及 ' },
          { type: 'inlineCode', value: 'const theme = "light"' },
          { type: 'text', value: '。还可以检查' },
          {
            type: 'link',
            url: 'https://github.com/yozorajs/yozora-react',
            children: [{ type: 'text', value: '项目链接' }],
          },
          ...(preset === 'yozora'
            ? [
                { type: 'text', value: '与脚注' },
                { type: 'footnoteReference', identifier: 'demo-note', label: '1' },
              ]
            : []),
          { type: 'text', value: '。' },
        ],
      },
      {
        type: 'blockquote',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: '缩窄浏览器窗口，检查换行、间距和横向溢出。479px 是当前小屏样式的边界。',
              },
            ],
          },
        ],
      },
      {
        type: 'list',
        ordered: false,
        children: [
          {
            type: 'listItem',
            ...(extended ? { status: 'done' } : {}),
            children: [
              { type: 'paragraph', children: [{ type: 'text', value: '完成：主题与基础排版' }] },
            ],
          },
          {
            type: 'listItem',
            ...(extended ? { status: 'doing' } : {}),
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', value: '进行中：交互与响应式检查' }],
              },
            ],
          },
          {
            type: 'listItem',
            ...(extended ? { status: 'todo' } : {}),
            children: [
              { type: 'paragraph', children: [{ type: 'text', value: '待办：更多测试样例' }] },
            ],
          },
        ],
      },
      {
        type: 'heading',
        depth: 3,
        identifier: 'tables',
        children: [{ type: 'text', value: extended ? '表格与代码块' : '代码块' }],
      },
      ...(extended
        ? [
            {
              type: 'table',
              columns: [{ align: 'left' }, { align: 'center' }, { align: 'right' }],
              children: [
                {
                  type: 'tableRow',
                  children: [
                    { type: 'tableCell', children: [{ type: 'text', value: '组件' }] },
                    { type: 'tableCell', children: [{ type: 'text', value: '测试内容' }] },
                    { type: 'tableCell', children: [{ type: 'text', value: '状态' }] },
                  ],
                },
                {
                  type: 'tableRow',
                  children: [
                    { type: 'tableCell', children: [{ type: 'inlineCode', value: 'Markdown' }] },
                    { type: 'tableCell', children: [{ type: 'text', value: '渲染与布局' }] },
                    { type: 'tableCell', children: [{ type: 'text', value: 'Ready' }] },
                  ],
                },
                {
                  type: 'tableRow',
                  children: [
                    { type: 'tableCell', children: [{ type: 'inlineCode', value: 'CodeEditor' }] },
                    { type: 'tableCell', children: [{ type: 'text', value: '输入与高亮' }] },
                    { type: 'tableCell', children: [{ type: 'text', value: 'Ready' }] },
                  ],
                },
              ],
            },
          ]
        : []),
      { type: 'code', lang: 'typescript', meta: '{6-8} title="greeting.ts"', value: editorCode },
      { type: 'thematicBreak' },
    ],
  }
  return ast
}

export const footnotes = {
  'demo-note': {
    type: 'footnoteDefinition' as const,
    identifier: 'demo-note',
    label: '1',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', value: '检查脚注编号、返回链接和底部间距。' }],
      },
    ],
  },
}

export const admonitions = {
  type: 'root' as const,
  children: ['note', 'info', 'tip', 'caution', 'danger'].map(keyword => ({
    type: 'admonition',
    keyword,
    title: [{ type: 'text', value: keyword }],
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', value: '检查图标、边框、背景和文字的主题颜色。' }],
      },
    ],
  })),
}

export const math = {
  type: 'root' as const,
  children: [
    {
      type: 'paragraph',
      children: [
        { type: 'text', value: '行内公式与正文混排：质能方程 ' },
        { type: 'inlineMath', value: 'E = mc^2' },
        { type: 'text', value: '，以及欧拉恒等式 ' },
        { type: 'inlineMath', value: String.raw`e^{i\pi} + 1 = 0` },
        { type: 'text', value: '。检查公式的基线、间距与换行。' },
      ],
    },
    {
      type: 'heading',
      depth: 3,
      children: [{ type: 'text', value: '求和与积分' }],
    },
    { type: 'math', value: String.raw`\sum_{k=1}^{n} k = \frac{n(n+1)}{2}` },
    { type: 'math', value: String.raw`\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}` },
    {
      type: 'heading',
      depth: 3,
      children: [{ type: 'text', value: '矩阵与分段函数' }],
    },
    {
      type: 'math',
      value: String.raw`A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}, \quad \det A = ad - bc`,
    },
    {
      type: 'math',
      value: String.raw`f(x) = \begin{cases} x^2, & x \ge 0 \\ -x, & x < 0 \end{cases}`,
    },
  ],
}

export const live = {
  type: 'root' as const,
  children: [
    {
      type: 'code',
      lang: 'jsx',
      meta: 'live title="counter.jsx"',
      value: `function Counter() {
  const [count, setCount] = React.useState(0)
  return (
    <div className="demo-counter">
      <p>Live JSX counter</p>
      <output aria-label="计数">{count}</output>
      <button onClick={() => setCount(n => n + 1)}>增加</button>
    </div>
  )
}`,
    },
  ],
}

export const liveError = {
  ...live,
  children: [{ ...live.children[0], value: 'function {' }],
}
