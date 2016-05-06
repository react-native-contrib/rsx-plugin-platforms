const utils  = require('rsx-common');
const path   = require('path');
const rimraf = require('rimraf');

const log = utils.log;

const del = (platformPath) => {
    if (utils.path.isDirectory(platformPath)) {
        rimraf.sync(platformPath);
    }
};

module.exports = function remove(args, callback) {
    log.heading    = 'rsx-platforms rm';
    const platform = args;
    const appRoot  = process.env.RN_PROJECT_ROOT;

    del(path.join(appRoot, platform));
    log.info(`The ${platform} platform has been removed from ${appRoot}`);

    if (callback) { callback(); }
};
