const ejs = require('ejs')
const read = require('fs').readFileSync
const join = require('path').join;
const sander = require('sander')
const marked = require('marked')
const minify = require('html-minifier').minify
const renderHeader = require('./renderHeader')
const renderIndex = require('./renderIndex')
const renderNote = require('./renderNote')
const renderScript = require('./renderScript')
const strIndex = read(join('./templete', 'index.ejs'), 'utf8');

function renderStorage(config, storage) {
    var header = renderHeader(config, storage)

    /* render and save index html */
    var indexHtml = ejs.compile(strIndex)({
        config: config,
        storage: storage,
        header: header,
        content: renderIndex(config),
        inifunction: ''
    });
    
    sander.writeFileSync( join('output/','/index.html'), minify(indexHtml,{
        removeComments: true,
        collapseWhitespace: true,
        minifyJS:true, 
        minifyCSS:true
        })  
    )

    /* render snippets and save */
    storage.folders.forEach(function (folder) {
        folder.notes.forEach(function (note) {
            var noteContent = renderNote(note)
                var ret = ejs.compile(strIndex)({
                config: config,
                storage: storage,
                header: header,
                content: noteContent,
                inifunction: renderScript(note, storage.folders.indexOf(folder))
            });

            var notePath = join('output/snippets/', note.folder, '/', note.key, '/index.html')
            sander.writeFileSync(notePath, minify(ret, {
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true
            })
            )

            console.log('[Finished] render - ', note.title)
        })
    })
}

module.exports = renderStorage
