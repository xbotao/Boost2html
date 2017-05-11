/* 从一个模块中提取所有的floaders */
const _ = require('lodash')
const sander = require('sander')
const path = require('path')
const CSON = require('season')

function resolveStorageFloders(storageCache) {
    let storage = {
        path: storageCache.path
    }

    const boostnoteJSONPath = path.join(storageCache.path, 'boostnote.json')

    /* get Floders of the storage */
    try {
        let jsonData = CSON.readFileSync(boostnoteJSONPath)
        if (!_.isArray(jsonData.folders)) throw new Error('folders should be an array.')
        storage.folders = jsonData.folders
        storage.version = jsonData.version
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.warn('boostnote.json file doesn\'t exist the given path')
            CSON.writeFileSync(boostnoteJSONPath, { folders: [], version: '1.0' })
        } else {
            console.error(err)
        }
        storage.folders = []
        storage.version = '1.0'
    }

    let version = parseInt(storage.version, 10)
    if (version >= 1) {
        if (version > 1) {
            console.log('The repository version is newer than one of current app.')
        }
        //return Promise.resolve(storage)
        return storage
    }

}

module.exports = resolveStorageFloders