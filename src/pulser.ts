// tslint:disable:no-console
import { EventEmitter } from 'events'

export class Pulser extends EventEmitter {
  public start () {
    setInterval(() => {
      console.log(`${new Date().toISOString()} >>>> pulse`)
      this.emit('pulse')
      console.log(`${new Date().toISOString()} <<<< pulse`)
    }, 1000)
  }
}
