const ejs = require('ejs')
const read = require('fs').readFileSync
const join = require('path').join;
const str = read(join('./templete', 'indexContent.ejs'), 'utf8');

function renderIndex(config) {
    var ret = ejs.compile(str)({
        config: config
    });

    return ret
}

module.exports = renderIndex
