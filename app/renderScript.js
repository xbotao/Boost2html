const ejs = require('ejs')
const read = require('fs').readFileSync
const join = require('path').join;
const str = read(join('./templete', 'initScript.ejs'), 'utf8');

function renderScript(note, index) {
    var ret = ejs.compile(str)({
        note: note,
        notefolder: index
    });

    return ret
}

module.exports = renderScript
