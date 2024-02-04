import { chalk } from '@guanghechen/chalk/node'
import { Reporter, ReporterLevelEnum } from '@guanghechen/reporter'
import path from 'node:path'
import url from 'node:url'
import { detectTestDir, genAndWriteNxProjectJson } from './nx/project.mjs'

const reporter = new Reporter(chalk, {
  baseName: 'gen-project-lib',
  level: ReporterLevelEnum.INFO,
  flights: { inline: false, colorful: true },
})

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const workspaceRoot = path.dirname(__dirname)

/** @type {Promise<import('./nx/project.mjs').IGenNxProjectJsonParams>[]} */
const entries = [
  ...[
    'core-react-constant',
    'core-react-renderer',
    'core-react-theme',
    'core-react-types',
    'core-react-util',
    'react-admonition',
    'react-code',
    'react-code-editor',
    'react-code-embed',
    'react-code-highlighter',
    'react-code-literal',
    'react-code-live',
    'react-code-renderer-graphviz',
    'react-code-renderer-jsx',
    'react-code-runners',
    'react-common-copy-button',
    'react-common-light-buttons',
    'react-markdown',
    'react-mathjax',
  ].map(projectName => ({
    projectName,
    projectDir: 'packages/' + projectName,
    projectType: 'lib',
    tags: [],
  })),
].map(async entry => {
  // FIXME: fix broken tests.
  const brokenTests = ['react-code-renderer-graphviz']

  const { projectName, projectDir } = entry
  const absolutePackageDir = path.resolve(workspaceRoot, projectDir)
  const absoluteTestDir = path.join(absolutePackageDir, '__test__')
  const hasTest = !brokenTests.includes(projectName) && (await detectTestDir(absoluteTestDir))

  return {
    ...entry,
    workspaceRoot,
    entries: entry.entries ?? [
      //
      'clean',
      'build',
      'watch',
      hasTest ? 'test' : '',
    ],
  }
})

for await (const entry of entries) {
  await genAndWriteNxProjectJson(entry, reporter)
}
