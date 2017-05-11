const ejs = require('ejs')
const read = require('fs').readFileSync
const join = require('path').join;
const sander = require('sander')
const marked = require('marked');
const highlight = require('highlight.js')
const str = read(join('./templete', 'noteContent.ejs'), 'utf8');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
});

function renderNote(note) {
    
    note.description = marked('> ' + note.description.replace(note.title,"").replace('\n',""))
    //console.log(note.description)

    for (var i = 0; i < note.snippets.length; i++) {
        note.snippets[i].marked = marked('```'+ note.snippets[i].mode+'\n' + note.snippets[i].content + '\n```')
    }

    var ret = ejs.compile(str)({
        note: note
    });

    //console.log(ret)
    return ret
}

module.exports = renderNote

