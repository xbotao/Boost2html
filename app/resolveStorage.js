const resolveFloders = require('./resolveStorageFloders')
const resolveNotes = require('./resolveStorageNotes')

function resolveStorage(storageChace) {
    //let storage
    let storage = resolveFloders(storageChace)
    var notes = resolveNotes(storageChace)

    for (var i = 0; i < storage.folders.length; i++) {
        let fNotes = notes.filter(function (note) {
            return note.folder === storage.folders[i].key;
        });
        storage.folders[i].notes = fNotes
        //  console.log(i, storage.folders[i].notes)
        //  console.log('============')
    }

    return storage
}

module.exports = resolveStorage