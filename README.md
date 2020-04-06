# gNodeIt-cli

[![NPM](https://nodei.co/npm/gnodeit-cli.png)](https://nodei.co/npm/gnodeit-cli.png)

A simple, reliable, command line interface to create notes, write content in VSCode and automatically syncing them into a configured repository.

## How to use

gNodeIt-cli is really simple to use.

### Prerequesits
> Node.js

### Installing gNodeIt

### Configuring gNodeIt

A .env file in the root folder is necessary to use gNodeIt

A example:
```
# Base configuration
EDITOR='code'
OPEN='folder'
ATTACH_HEADER=true
NOTES_PATH='C:/Users/yourUser/Desktop/notes/'
FOLDERSTRUCTURE='fullDate'
GIT_SYNC=true
GIT_BASIC_AUTH_USERNAME='GitUser'
GIT_BASIC_AUTH_PASSWORD='GitPassword'
GIT_PATH='github.com/GitUser/notesrepository'
CLIENT_NAME='DeviceName'
```
## To-Do's

- Tests
- Open and continue editing
- Configuration via CLI
- Fetch and pull before creating new documents ones
- Initiate new repositories
- ToDo sync (get To-Do's from Documents and sync them to configured To-Do Apps)

## License

GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007