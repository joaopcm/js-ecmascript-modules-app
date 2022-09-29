import readline from 'node:readline'
import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'

import Person from './person.js'

export default class TerminalController {
  constructor() {
    this.print = {}
    this.data= {}
    this.terminal = {}
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)

    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this.initializeTable(database, language)
  }

  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language))
    const table = chalkTable(this.getTableOptions(), data)

    this.print = console.draft(table)
    this.data = data
  }

  closeTerminal() {
    this.terminal.close()
  }

  updateTable(item) {
    this.data.push(item)
    this.print(chalkTable(this.getTableOptions, this.data))
  }

  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve))
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan("ID") },
        { field: 'vehicles', name: chalk.magenta("Vehicles") },
        { field: 'kmTraveled', name: chalk.red("KM Traveled") },
        { field: 'from', name: chalk.yellow("From") },
        { field: 'to', name: chalk.blue("To") },
      ]
    }
  }
}