const resolveStorage = require('./app/resolveStorage')
const renderStorage = require('./app/renderStorage')
const YAML = require('yamljs')
const sander = require('sander')

/* get system config */
var config = YAML.load('_config.yml');
if(config){
    console.log( '[Finished] load _config.yml sucessful')
}

/* resolve snippets */
let storage
if (config.BoostStorage){
    storage = resolveStorage({path: config.BoostStorage})
}

if(storage){
    console.log( '[Finished] resolve Boostnote Storage ')
}

/* copy assert from templete to output */
sander.copydir('templete/assert/').to('output/assert/')
console.log( '[Finished] create assert file')

/* render storage */
renderStorage(config, storage)

require('simple-git')(__dirname + '/output/')
    .add('./*')
    .commit("first commit!")
    .push(['-u', 'origin', 'coding-pages'], function () {
        console.log( '[Finished] push htmls to coding-pages')
});

require('simple-git')(config.BoostStorage)
    .add('./*')
    .commit("first commit!")
    .push(['-u', 'origin', 'master'], function () {
        console.log( '[Finished] push notes to master')
});


