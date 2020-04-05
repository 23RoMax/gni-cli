async function newRepository (path) {
    console.log('New repository initialised')
}

async function up (path) {
    const git = require('simple-git')(path)
    const USER = process.env.GIT_BASIC_AUTH_USERNAME
    const PASS = process.env.GIT_BASIC_AUTH_PASSWORD
    const REPO = process.env.GIT_PATH
    let REMOTE = `https://${USER}:${PASS}@${REPO}`
    // simpleGit
    git.add('./*')
    .commit(`Notes pushed from ${process.env.CLIENT_NAME}!`)
    .push(['-u', 'origin', 'master'])
}

module.exports = {
    newRepository,
    up
}