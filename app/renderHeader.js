const ejs = require('ejs')
const read = require('fs').readFileSync
const join = require('path').join;
const str = read(join('./templete', 'header.ejs'), 'utf8');

function renderHeader(config, storage) {
    var ret = ejs.compile(str)({
        config: config,
        storage: storage
    });

    return ret
}

module.exports = renderHeader
