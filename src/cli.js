const promptMissingOption = require('./utils/inquirer')
const noter = require('./modules/noter/noter')
const dotenv = require('dotenv')
let config = null

async function loadConfig () {
    config = dotenv.config()
    if (config.error) {
        throw console.log('No .env file detected!')
    }
}

module.exports.cli = async function (args) {
    await loadConfig()
    options = await promptMissingOption(args)
    await noter(options)
    console.log('Nice Work, a new note a day keeps the doctor away!')
   }