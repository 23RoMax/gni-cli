const promptMissingOption = require('./utils/inquirer')
const noter = require('./modules/noter/noter')
const dotenv = require('dotenv')
const arg = require('arg')
const path = require('path')

let config = null

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
      {
        '--template': String,
        '--name': String,
        '-t': '--template',
        '-n': '--name'
      },
      {
        argv: rawArgs.slice(2),
      }
    );
    return {
      template: args['--template'],
      filename: args['--name']
    }
   }

async function loadConfig () {
    config = dotenv.config({ path: path.normalize(path.resolve(__dirname, '..')+'/.env') })
    if (config.error) {
        throw console.log('No .env file detected!')
    }
}

module.exports.cli = async function (args) {
  await loadConfig()
  if (args[2] === 'open') {
    await noter(args[2])
  } else {
    let options = parseArgumentsIntoOptions(args)
    options = await promptMissingOption(options)
    await noter(options)
    console.log('Nice Work, a new note a day keeps the doctor away!')
  }
}