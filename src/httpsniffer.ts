// tslint:disable:no-console
import * as util from 'util'
import * as url from 'url'
import * as http from 'http'

const timestamp = () => new Date().toISOString()

const reqToString = (req: http.IncomingMessage) => {
  let ret = `method ${req.method} ${req.httpVersion} ${req.url} \n`
  ret += JSON.stringify(url.parse(req.url, true)) + '\n'
  const keys = Object.keys(req.headers)
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]
    ret += `${i} ${k}: ${req.headers[k]}\n`
  }
  if (req.trailers) {
    ret += util.inspect(req.trailers) + '\n'
  }
  return ret
}

export const sniffOn = (server: http.Server) => {
  server.on('request', (req, res) => {
    // console.log(`${timestamp()} e_request`)
    console.log(`${timestamp()} ${reqToString(req)}`)
  })
  server.on('close', (errno: number) => {
    console.log(`close ${timestamp()} ${errno}`)
  })
  server.on('checkContinue', (req: http.IncomingMessage, res: http.ServerResponse) => {
    console.log(`${timestamp()} e_checkContinue`)
    console.log(`${timestamp()} ${reqToString(req)}`)
    res.writeContinue()
  })
  server.on('upgrade', (req: http.IncomingMessage, res: http.ServerResponse) => {
    console.log(`${timestamp()} e_upgrade`)
    console.log(`${timestamp()} ${reqToString(req)}`)
  })
  server.on('clientError', () => {
    console.log(`${timestamp()} e_clientError`)
  })
}
