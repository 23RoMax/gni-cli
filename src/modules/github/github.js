function requireWithPath (path) {
    var git = require('simple-git')(path)
    return git
}

async function newRepository (path) {
    console.log('New repository initialised')
}

async function fetchRepository (path) {
    var git = requireWithPath(path)
    git.fetch()
}

async function pullRepository (path) {
    var git = requireWithPath(path)
    git.pull()
}

async function up (path) {
    var git = requireWithPath(path)
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
    fetchRepository,
    pullRepository,
    newRepository,
    up
}