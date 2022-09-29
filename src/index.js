import database from './../database.json'
import Person from './person.js'
import TerminalController from './terminalController.js'

const DEFAULT_LANGUAGE = 'pt-BR'
const STOP_TERM = ':q'


const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLoop() {
  try {
    const answer = await terminalController.question()

    if (answer === STOP_TERM) {
      console.log('Process finished!')
      terminalController.closeTerminal()
      return
    }

    const person = Person.generateInstanceFromString(answer)

    return mainLoop()
  } catch (error) {
    
  }
}

await mainLoop()