/** Generate changelogs from local summaries without GitHub API access. */
export const getReleaseLine = async changeset => {
  const [firstLine, ...rest] = changeset.summary.split('\n').map(line => line.trimEnd())
  let result = `- ${firstLine}`
  if (rest.length > 0) result += '\n' + rest.map(line => (line ? `  ${line}` : '')).join('\n')
  return result
}

export const getDependencyReleaseLine = async (_changesets, dependenciesUpdated) => {
  if (dependenciesUpdated.length === 0) return ''
  const updates = dependenciesUpdated.map(dep => `  - ${dep.name}@${dep.newVersion}`)
  return ['- Updated dependencies:', ...updates].join('\n')
}
