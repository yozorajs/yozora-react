import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { build } from 'tsdown'
import config from './tsdown.config.mjs'

const outputDir = path.join(import.meta.dirname, 'dist')
const port = Number(process.env.PORT ?? 7302)
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT')
const clients = new Set()
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.map': 'application/json',
}

const server = http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end()
    return
  }
  let pathname
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
  } catch {
    response.writeHead(400).end('Invalid URL')
    return
  }
  if (pathname === '/__reload' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store' })
    response.write(': connected\n\n')
    clients.add(response)
    response.on('close', () => clients.delete(response))
    return
  }
  const file = path.resolve(outputDir, '.' + (pathname === '/' ? '/index.html' : pathname))
  if (!file.startsWith(outputDir + path.sep)) {
    response.writeHead(403).end('Forbidden')
    return
  }
  void fs.readFile(file).then(
    content => {
      response.writeHead(200, {
        'Content-Type': mimeTypes[path.extname(file)] ?? 'application/octet-stream',
        'Cache-Control': 'no-store',
      })
      if (request.method === 'HEAD') {
        response.end()
        return
      }
      if (path.extname(file) === '.html') {
        const reload =
          '<script>new EventSource("/__reload").onmessage = () => location.reload()</script>'
        response.end(content.toString().replace('</body>', reload + '</body>'))
      } else response.end(content)
    },
    error => {
      response.writeHead(error.code === 'ENOENT' || error.code === 'EISDIR' ? 404 : 500).end()
      if (error.code !== 'ENOENT' && error.code !== 'EISDIR') console.error(error)
    },
  )
})

let resolveInitialBuild
const initialBuild = new Promise(resolve => {
  resolveInitialBuild = resolve
})
const handle = await build({
  ...config,
  config: false,
  watch: true,
  hooks: {
    async 'build:done'(context) {
      await config.hooks['build:done'](context)
      resolveInitialBuild()
      for (const client of clients) client.write('data: reload\n\n')
    },
  },
})

// Serve only after the initial bundle, HTML, and styles are ready.
await initialBuild
server.once('error', error => {
  console.error(error)
  void handle.watch.close()
  process.exitCode = 1
})
server.listen(port, '127.0.0.1', () => console.log(`Demo: http://127.0.0.1:${port}`))

async function stop() {
  for (const client of clients) client.end()
  server.close()
  await handle.watch.close()
}
process.once('SIGINT', () => void stop())
process.once('SIGTERM', () => void stop())
