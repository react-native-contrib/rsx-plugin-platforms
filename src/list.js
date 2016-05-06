const utils = require('rsx-common');
const path  = require('path');

const log     = utils.log;

module.exports = function list(args, callback) {
    log.heading   = 'rsx-platforms ls';
    const appRoot = process.env.RN_PROJECT_ROOT;
    const name    = utils.path.getProjectFolderName(appRoot);

    const files = {
        android: path.join(appRoot, 'android', 'app', 'src', 'main', 'AndroidManifest.xml'),
        ios: path.join(appRoot, 'ios', name + '.xcodeproj'),
    };

    files.forEach((file, platform) => {
        if (utils.isFile(file)) {
            log.info(`The ${platform} platform was found`);
        }
    });

    if (callback) { callback(); }
};
