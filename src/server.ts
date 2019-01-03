// tslint:disable:no-console
import * as http from 'http'
import * as util from 'util'
import * as url from 'url'
import * as os from 'os'
import { sniffOn } from './httpsniffer.ts'

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer()

server.on('request', (req: http.IncomingMessage, res: http.ServerResponse) => {
  const reqUrl = url.parse(req.url, true)
  console.log(`url ${req.url} and method ${req.method}`)
  if (reqUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`
      <html>
        <head>
          <title>Hello, world!</title>
        </head>
        <body>
          <h1>Hello, world!</h1>
          <p><a href="/osinfo">OS Info</a></p>
        </body>
      </html>
    `)
  } else if (reqUrl.pathname === '/osinfo') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`
      <html>
        <head>
          <title>Operating System Info</title>
        </head>
        <body>
          <h1>Operating System Info</h1>
          <table>
            <tr>
              <th>TMP Dir</th>
              <td>${os.tmpdir()}</td>
            </tr>
            <tr>
              <th>Host Name</th>
              <td>${os.hostname()}</td>
            </tr>
            <tr>
              <th>OS Type</th>
              <td>${os.type()} ${os.platform()} ${os.arch()} ${os.release()}</td>
            </tr>
            <tr>
              <th>Uptime</th>
              <td>${os.uptime()} ${util.inspect(os.loadavg())}</td>
            </tr>
            <tr>
              <th>Memory</th>
              <td>${os.totalmem()} free ${os.freemem()}</td>
            </tr>
            <tr>
              <th>CPU's</th>
              <td><pre>${os.cpus()}</pre></td>
            </tr>
            <tr>
              <th>Network</th>
              <td><pre>${util.inspect(os.networkInterfaces())}</pre></td>
            </tr>
          </table>
        </body>
      </html>
    `)
  } else {
    res.writeHead(404, { 'Content-Type': 'text-html' })
    res.end('bad url', req.url)
  }
})

// sniff on this server instance
sniffOn(server)

// start listening for incoming connections
server.listen(port, hostname, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server running at http://${hostname}:${port}/`)
})
