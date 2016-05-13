const utils = require('rsx-common');
const chai = require('chai');
const mock = require('mock-require');
const sinon = require('sinon');
const path = require('path');

const expect = chai.expect;
const log = utils.log;

log.level = 'silent';

describe('platforms', () => {

    it('should throw an error if an invalid action is specified', () => {
        process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures');
        mock('rsx-common', {
            log: log,
            process: {
                run: () => { return (callback) => { callback(arguments); }; },
            },
            path: utils.path,
            project: utils.project,
            validate: utils.validate,
        });
        const spy = sinon.spy();
        const command = require('../src/platforms');
        command(['pppppp'], spy);
        expect(spy.calledWith('pppppp is not a valid action for this command'));
        mock.stop('rsx-common');
    });

    it('should execute the subcommand if a valid action is specified', () => {
        const spy = sinon.spy();
        const command = require('../src/platforms');
        command(['ls'], spy);

        expect(spy.calledOnce).to.deep.equals(true);
    });

    describe('ls', () => {

        it('should show a list of installed platforms', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures');
            var result;
            const command = require('../src/list');
            command({}, (platforms) => {
                result = platforms;
            });

            expect(result).to.deep.equals(['android', 'ios']);
        });

    });

    describe('add', () => {

        it('should add a platform project for React Native');
    });

    describe('rm', () => {

        it('should remove a platform project for React Native');

    });

});
