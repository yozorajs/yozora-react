import * as Gfm from '@yozora/react-gfm'
import * as GfmEx from '@yozora/react-gfm-ex'
import { ThemeProvider, themeSchemas } from '@yozora/react-renderer'
import { CodeEditor } from '@yozora/react-renderer-code'
import * as Yozora from '@yozora/react-yozora'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { admonitions, editorCode, footnotes, live, liveError, markdownSamples } from './fixtures'
import { DemoImageViewer, ImageDemo, previewImages } from './ImageDemo'
import { MathDemo } from './MathDemo'
import { MermaidDemo } from './MermaidDemo'

const presets = [
  { id: 'gfm', renderer: Gfm, description: '排版 · 链接 · 引用 · 列表 · 代码' },
  { id: 'gfm-ex', renderer: GfmEx, description: '基础排版 · 删除线 · 任务列表 · 表格' },
  {
    id: 'yozora',
    renderer: Yozora,
    description: '扩展排版 · 脚注 · 数学公式 · Admonition · Live JSX',
  },
] as const

function App(): React.ReactElement {
  const [presetIndex, setPresetIndex] = React.useState(2)
  const preset = presets[presetIndex]
  const Markdown: React.ComponentType<Yozora.IMarkdownProps> = preset.renderer.Markdown
  const { MarkdownProvider } = preset.renderer
  const isYozora = preset.id === 'yozora'
  const [themeIndex, setThemeIndex] = React.useState(() =>
    themeSchemas.findIndex(schema => schema.theme === 'vsc' && schema.variant === 'light-modern'),
  )
  const selectedTheme = themeSchemas[themeIndex]
  const [showLineNo, setShowLineNo] = React.useState(true)
  const [showTableColumnLines, setShowTableColumnLines] = React.useState(true)
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
    <ThemeProvider theme={selectedTheme.theme} variant={selectedTheme.variant}>
      {presets.map(item => (
        <link
          key={item.id}
          rel="stylesheet"
          href={`./${item.id}.css`}
          media={item.id === preset.id ? 'all' : 'not all'}
        />
      ))}
      <div className="demo">
        <header className="demo-header">
          <a className="demo-brand" href="#top">
            <img className="demo-logo" src="./yozora.svg" width="38" height="38" alt="" />
            yozora<span>component lab</span>
          </a>
          <div className="demo-controls">
            <label>
              Renderer
              <select
                value={presetIndex}
                onChange={event => setPresetIndex(Number(event.target.value))}
              >
                {presets.map((item, index) => (
                  <option key={item.id} value={index}>
                    react-{item.id}
                  </option>
                ))}
              </select>
            </label>
            <label>
              主题
              <select
                value={themeIndex}
                onChange={event => setThemeIndex(Number(event.target.value))}
              >
                {themeSchemas.map((schema, index) => (
                  <option key={`${schema.theme}/${schema.variant}`} value={index}>
                    {schema.theme} / {schema.variant}
                  </option>
                ))}
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
            {preset.id !== 'gfm' && (
              <label>
                <input
                  type="checkbox"
                  checked={showTableColumnLines}
                  onChange={event => setShowTableColumnLines(event.target.checked)}
                />
                表格列线
              </label>
            )}
            <span className="demo-viewport">
              {width}px · {width <= 479 ? '小屏' : '常规'}
            </span>
          </div>
        </header>

        <main id="top" className="demo-main">
          <div className="demo-intro">
            <p className="demo-eyebrow">COMPONENT PLAYGROUND</p>
            <h1>在真实页面中测试组件。</h1>
            <p>切换 Renderer 和主题、修改代码，或缩窄浏览器窗口查看小屏效果。</p>
            <nav aria-label="测试区域">
              <a href="#markdown">Markdown</a>
              {isYozora && <a href="#admonitions">Admonition</a>}
              {isYozora && <a href="#math">Math</a>}
              <a href="#editor">Code editor</a>
              <a href="#mermaid">Mermaid</a>
              <a href="#images">Images</a>
              {isYozora && <a href="#live">Live JSX</a>}
            </nav>
          </div>

          <MarkdownProvider
            key={preset.id}
            showCodeLineno={showLineNo}
            showTableColumnLines={showTableColumnLines}
            images={previewImages}
            ImageViewer={DemoImageViewer}
          >
            <section id="markdown" className="demo-section">
              <div className="demo-section-heading">
                <h2>01 / Markdown</h2>
                <span aria-live="polite">{preset.description}</span>
              </div>
              <div className="demo-surface">
                <MarkdownProvider
                  showCodeLineno={showLineNo}
                  showTableColumnLines={showTableColumnLines}
                  footnoteDefinitionMap={footnotes}
                >
                  <Markdown ast={markdownSamples[preset.id]} footnoteDefinitionsTitle="脚注" />
                </MarkdownProvider>
              </div>
            </section>

            {isYozora && (
              <section id="admonitions" className="demo-section">
                <div className="demo-section-heading">
                  <h2>02 / Admonition</h2>
                  <span>五种语义状态</span>
                </div>
                <div className="demo-surface">
                  <Markdown ast={admonitions} />
                </div>
              </section>
            )}

            {isYozora && (
              <section id="math" className="demo-section">
                <div className="demo-section-heading">
                  <h2>03 / Math</h2>
                  <span>行内公式 · 求和 · 积分 · 矩阵 · 分段函数</span>
                </div>
                <div className="demo-surface">
                  <MathDemo />
                </div>
              </section>
            )}

            <section id="editor" className="demo-section">
              <div className="demo-section-heading">
                <h2>{isYozora ? '04' : '02'} / Code editor</h2>
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
                  showLineNo={showLineNo}
                />
                <p className="demo-hint" aria-live="polite">
                  {code.split('\n').length} 行 · {code.length} 字符
                </p>
              </div>
            </section>

            {isYozora && (
              <section id="live" className="demo-section">
                <div className="demo-section-heading">
                  <h2>05 / Live JSX</h2>
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
            )}
            <section id="mermaid" className="demo-section">
              <div className="demo-section-heading">
                <h2>{isYozora ? '06' : '03'} / Mermaid</h2>
                <span>SVG 图表 · 实时编辑</span>
              </div>
              <div className="demo-surface">
                <p className="demo-hint">
                  修改 Mermaid 源码查看图表，主题随页面切换。点击图表可放大预览。
                </p>
                <MermaidDemo showLineNo={showLineNo} />
              </div>
            </section>
            <section id="images" className="demo-section">
              <div className="demo-section-heading">
                <h2>{isYozora ? '07' : '04'} / Image preview</h2>
                <span>缩放 · 旋转 · 裁剪 · 拉伸</span>
              </div>
              <div className="demo-surface">
                <p className="demo-hint">
                  点击图片打开预览。裁剪和拉伸仅影响当前视图，可随时重置。
                </p>
                <ImageDemo />
              </div>
            </section>
          </MarkdownProvider>
        </main>
        <footer className="demo-footer">Yozora React / Local component testing</footer>
      </div>
    </ThemeProvider>
  )
}

const container = document.getElementById('root')
if (!container) throw new Error('Missing demo root element')
createRoot(container).render(<App />)
