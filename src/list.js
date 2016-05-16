'use strict';

let utils = require('rsx-common');
let path  = require('path');

let log     = utils.log;

module.exports = function list(args, callback) {
    log.heading   = 'rsx-platforms ls';
    let appRoot = process.env.RN_PROJECT_ROOT;
    let name    = path.basename(appRoot);

    let files = {
        android: ['app', 'src', 'main', 'AndroidManifest.xml'],
        ios: [`${name}.xcodeproj`],
    };

    let found  = [];
    let errors = [];

    Object.keys(files).forEach((platform) => {
        let platformPath = path.join(appRoot, platform);
        try {
            if (utils.path.isDirectory(platformPath)) {
                log.info(`The ${platform} platform was found`);
                found.push(platform);
            }
        } catch (e) {
            errors.push(e);
        }
    });

    if (found.length === 0) {
        log.info('No platforms were found');
    }

    if (callback) { callback(found, errors); }
};
