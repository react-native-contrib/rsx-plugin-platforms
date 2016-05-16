'use strict';

let utils  = require('rsx-common');
let path   = require('path');
let rimraf = require('rimraf');

let log = utils.log;

const del = (platformPath) => {
    if (utils.path.isDirectory(platformPath)) {
        rimraf.sync(platformPath);
    }
};

module.exports = function remove(args, callback) {
    log.heading    = 'rsx-platforms rm';
    let platform = args;
    let appRoot  = process.env.RN_PROJECT_ROOT;

    del(path.join(appRoot, platform));
    log.info(`The ${platform} platform has been removed from ${appRoot}`);

    if (callback) { callback(); }
};
