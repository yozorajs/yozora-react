import { CodeEditor } from '@yozora/react-code-editor'
import { ThemeProvider } from '@yozora/react-core'
import { Markdown, MarkdownProvider } from '@yozora/react-markdown'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { admonitions, editorCode, footnotes, live, liveError, markdown } from './fixtures'

function App(): React.ReactElement {
  const [theme, setTheme] = React.useState<'light' | 'darken'>('light')
  const [showLineNo, setShowLineNo] = React.useState(true)
  const [code, setCode] = React.useState(editorCode)
  const [revision, setRevision] = React.useState(0)
  const [liveSample, setLiveSample] = React.useState(live)
  const [width, setWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    const onResize = (): void => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="demo" data-theme={theme}>
      <header className="demo-header">
        <a className="demo-brand" href="#top">
          yozora<span>component lab</span>
        </a>
        <div className="demo-controls">
          <label>
            主题
            <select
              value={theme}
              onChange={event => setTheme(event.target.value as 'light' | 'darken')}
            >
              <option value="light">Light</option>
              <option value="darken">Dark</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              checked={showLineNo}
              onChange={event => setShowLineNo(event.target.checked)}
            />
            显示行号
          </label>
          <span className="demo-viewport">
            {width}px · {width <= 479 ? '小屏' : '常规'}
          </span>
        </div>
      </header>

      <main id="top" className="demo-main">
        <div className="demo-intro">
          <p className="demo-eyebrow">COMPONENT PLAYGROUND</p>
          <h1>在真实页面中测试组件。</h1>
          <p>切换主题、修改代码，或缩窄浏览器窗口查看小屏效果。</p>
          <nav aria-label="测试区域">
            <a href="#markdown">Markdown</a>
            <a href="#admonitions">Admonition</a>
            <a href="#editor">Code editor</a>
            <a href="#live">Live JSX</a>
          </nav>
        </div>

        <ThemeProvider theme={theme}>
          <MarkdownProvider showCodeLineno={showLineNo}>
            <section id="markdown" className="demo-section">
              <div className="demo-section-heading">
                <h2>01 / Markdown</h2>
                <span>排版 · 列表 · 表格 · 高亮 · 复制 · 脚注</span>
              </div>
              <div className="demo-surface">
                <MarkdownProvider showCodeLineno={showLineNo} footnoteDefinitionMap={footnotes}>
                  <Markdown ast={markdown} footnoteDefinitionsTitle="脚注" />
                </MarkdownProvider>
              </div>
            </section>

            <section id="admonitions" className="demo-section">
              <div className="demo-section-heading">
                <h2>02 / Admonition</h2>
                <span>五种语义状态</span>
              </div>
              <div className="demo-surface">
                <Markdown ast={admonitions} />
              </div>
            </section>

            <section id="editor" className="demo-section">
              <div className="demo-section-heading">
                <h2>03 / Code editor</h2>
                <button type="button" onClick={() => setCode(editorCode)}>
                  重置代码
                </button>
              </div>
              <div className="demo-surface">
                <p className="demo-hint">直接输入，检查光标、选区、缩进和高亮是否对齐。</p>
                <CodeEditor
                  code={code}
                  lang="typescript"
                  onChange={setCode}
                  darken={theme === 'darken'}
                  showLineNo={showLineNo}
                />
                <p className="demo-hint" aria-live="polite">
                  {code.split('\n').length} 行 · {code.length} 字符
                </p>
              </div>
            </section>

            <section id="live" className="demo-section">
              <div className="demo-section-heading">
                <h2>04 / Live JSX</h2>
                <div className="demo-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setLiveSample(liveError)
                      setRevision(value => value + 1)
                    }}
                  >
                    错误示例
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLiveSample(live)
                      setRevision(value => value + 1)
                    }}
                  >
                    重置示例
                  </button>
                </div>
              </div>
              <div className="demo-surface">
                <p className="demo-hint">
                  编辑 JSX
                  查看实时结果。黄色按钮折叠代码，绿色按钮展开；“错误示例”用于检查错误提示。
                </p>
                <Markdown key={revision} ast={liveSample} />
              </div>
            </section>
          </MarkdownProvider>
        </ThemeProvider>
      </main>
      <footer className="demo-footer">Yozora React / Local component testing</footer>
    </div>
  )
}

const container = document.getElementById('root')
if (!container) throw new Error('Missing demo root element')
createRoot(container).render(<App />)
