import { Markdown, MathJaxProvider } from '@yozora/react-yozora'
import React from 'react'
import { math } from './fixtures'

const mathjaxConfig: React.ComponentProps<typeof MathJaxProvider>['mathjaxConfig'] = {
  loader: { paths: { 'mathjax-newcm': './mathjax-newcm-font' } },
  startup: { typeset: false, loadAllFontFiles: false },
  tex: { inlineMath: [['$', '$']], displayMath: [['$$', '$$']] },
  options: { enableMenu: false },
}

export function MathDemo(): React.ReactElement {
  const [failed, setFailed] = React.useState(false)
  return (
    <MathJaxProvider
      mathjaxSrc="./mathjax/tex-mml-chtml.js"
      mathjaxConfig={mathjaxConfig}
      loading={
        <p className="demo-hint" role="status">
          正在加载数学公式…
        </p>
      }
      onError={() => setFailed(true)}
    >
      {failed ? (
        <p className="demo-hint" role="alert">
          数学公式加载失败，请刷新页面重试。
        </p>
      ) : (
        <Markdown ast={math} />
      )}
    </MathJaxProvider>
  )
}
