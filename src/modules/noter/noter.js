const fs = require('fs')
const { execSync } = require('child_process')
const path = require('path')
const getDate = require('../../utils/date')
const github = require('../github/github')
// const hound = require('hound')

module.exports = async function createNote (options) {
    let date = null
    var changeCounter = 0
    if (process.env.FOLDERSTRUCTURE === 'fullDate') {
        date = await getDate()
    }

    // The actual name of the file
    const _fileName = options.name + '.' + options.template
    // The defaultPath
    const defaultPath = path.normalize(date ? process.cwd() + '/notes/' + date + '/' : process.cwd() + '/notes/')
    const basePath = path.normalize(process.env.NOTES_PATH + '/' || process.cwd() + '/notes/')
    // The path of the configured folder that holds the notes, extended by the Folderstructure configured
    const _path = date ? path.normalize(process.env.NOTES_PATH + date + '/') || defaultPath : path.normalize(process.env.NOTES_PATH) || defaultPath
    // The actual filePath
    const _filePath = path.normalize(_path + _fileName || defaultPath + _fileName)
    // The header of the file
    const _header = new Uint8Array(Buffer.from('# Title of your document ' + _fileName))

    async function createNewNote (filePath, _path, header) {
        if (!fs.existsSync(_path)){
            console.log(_path, 'does not exist')
            fs.mkdirSync(_path)
        }
        fs.writeFile (filePath, header, (err) => {
            if (err) throw err
            // console.log('New note added!')
        })
    }

    async function openNote (filePath, fileName, path) {
        let execute = null 

        if (process.env.EDITOR === 'code') {
            execute = 'code'
            if (process.env.OPEN === 'file') {
                execute = execute + ' ' + filePath
            } else {
                execute = 'code ' + path
            }
        }
        if (process.env.EDITOR === 'nano') {
            console.log('Detected Nano configuration!')
            execute = 'nano ./notes/' + fileName
            // console.log(execute)
        }

        execSync(execute, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`)
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`)
                return;
            }
            console.log(stdout)
        })
    }

    async function watchNote (filePath, fileName, path) {
        fs.watchFile (filePath, (curr, prev) => {
            console.log(curr.mtime, 'Filechange detected, autocommitting if configured.')
            if (process.env.GIT_SYNC === 'true') {
                console.log('Git Sync is activated. Committing changes and pushing them.')
                github.up(basePath)
            }
            })

        // Tested to watch the whole path with hound, but created too much chaos when .gitignore is missing - as it is not possible to exclude files
        /* watcher = hound.watch(filePath)
        watcher.on('change', function(file, stats) {
            console.log(`${stats.mtime}: Filechange in ${file} detected, autocommitting if configured.`)
            if (process.env.GIT_SYNC === 'true') {
                console.log('Git Sync is activated. Committing changes and pushing them.')
                github.up(basePath)
            }
          })*/
    }

    await createNewNote (_filePath, _path, _header)
    await openNote (_filePath, _fileName, _path)
    await watchNote (_filePath, _fileName, _path)
}
