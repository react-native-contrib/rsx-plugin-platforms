const utils = require('rsx-common');
const path  = require('path');

const log     = utils.log;

module.exports = function list(args, callback) {
    log.heading   = 'rsx-platforms ls';
    const appRoot = process.env.RN_PROJECT_ROOT;
    const name    = utils.path.getProjectFolderName(appRoot);

    const files = {
        android: ['app', 'src', 'main', 'AndroidManifest.xml'],
        ios: [`${name}.xcodeproj`],
    };

    const found  = [];
    const errors = [];

    Object.keys(files).forEach((platform) => {
        const platformPath = path.join(appRoot, platform);
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
