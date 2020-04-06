const inquirer = require('inquirer')
const getDate = require('../utils/date')

module.exports = async function promptMissingOptions (options) {
    const defaultTemplate = 'Note'
    const defaultName = await getDate()

    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
            name: defaultName + '-' + options.name || defaultName
        }
    }

    const questions = []
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Which note template do you want to create?',
            choices: ['md', 'txt']
        })
    }

    if (!options.filename) {
        questions.push({
            type: 'input',
            name: 'filename',
            message: 'Name of the note?',
            default: defaultTemplate
        })
    }

    const answers = await inquirer.prompt(questions)
    return {
        ...options,
        template: options.template || answers.template,
        name: defaultName + '-' + answers.filename,
        date: await getDate()
    }
}
