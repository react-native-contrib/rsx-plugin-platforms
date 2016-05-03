const utils = require('rsx-common');
const path = require('path');
const yo = require('yeoman-environment');
const log = utils.log;



module.exports = function add(args, callback) {
    const appRoot = process.env['RN_PROJECT_ROOT'];
    log.heading = 'rsx-platforms add';

    const platform = args;

    const env = yo.createEnv();
    const generatorPath = path.join(__dirname, 'generator-' + platform);
    env.register(generatorPath, 'react:app');

    // const args = ['react:app', name].concat(process.argv.slice(4));
    env.run(args, function() {
        process.chdir(oldCwd);
    });

}
