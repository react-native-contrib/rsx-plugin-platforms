const utils = require('rsx-common');
const path = require('path');
const log = utils.log;

const checkForFile = (file) => {
    try {
        utils.fileExists(file);
        return true;
    } catch (e) {
        console.error(e);
    }
    return false;
}

module.exports = function list(args, callback) {
    const appRoot = process.env['RN_PROJECT_ROOT'];
    log.heading = 'rsx-platforms ls';

    const xcodeprojFile = 'ios/' + appRoot.split('/').pop() + '.xcodeproj';
    const androidGradleFile = 'android/build.gradle';

    if (checkForFile(xcodeprojFile)) {
        log.info('iOS project found');
    }

    if (checkForFile(androidGradleFile)) {
        log.info('Android project found');
    }
}
