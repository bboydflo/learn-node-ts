import { Pulser } from './pulser';

const pulser = new Pulser()

pulser.on('pulse', () => {
  // tslint:disable-next-line:no-console
  console.log(`${new Date().toISOString()} pulse received`)
})

pulser.start()
