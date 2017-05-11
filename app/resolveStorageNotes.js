const sander = require('sander')
const path = require('path')
const CSON = require('season')

function resolveStorageNotes (storage) {
    const notesDirPath = path.join(storage.path, 'notes')
    let notePathList

    /* to get the notes dir path */
    try{
        notePathList = sander.readdirSync(notesDirPath)
    }catch (err) {
        if (err.code === 'ENOENT') {
            console.log (notesDirPath, ' doesn\'t exist.')
            sander.mkdirSync(notesDirPath)
        } else {
            console.warn ('Faild to find note dir', notesDirPath, err)
        }
        notePathList = []
    }

    let notes = notePathList
        .filter( function filterOnlyCSONFile (notePath){
            /* only return the cson file */
            return /\.cson$/.test(notePath)
        })
        .map(function parseCSONFile (notePath) {
            /* prarse cson files */
            try{
                let data = CSON.readFileSync( path.join(notesDirPath, notePath))
                data.key = path.basename( notePath, '.cson')
                return data
            } catch(err) {
                console.error( notePath)
                throw err
            }
        }).filter( function filterOnlySnippet(note){
            return note.type === 'SNIPPET_NOTE'            
        })

    //console.log (notes)
    //return Promise.resolve(notes)
    return notes
}

module.exports = resolveStorageNotes