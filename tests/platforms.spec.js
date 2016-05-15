'use strict';

const utils = require('rsx-common');
const chai = require('chai');
const rewire = require('rewire');
const sinon = require('sinon');
const path = require('path');

const expect = chai.expect;
const log = utils.log;

log.level = 'silent';

describe('platforms', () => {

    describe('error conditions', () => {

        it('should throw an error if an invalid action is specified', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures');
            const spy = sinon.spy();
            const command = require('../src/platforms');
            command(['pppppp'], spy);

            expect(spy.calledWith('pppppp is not a valid action for this command'));
        });

        it('should execute the subcommand if a valid action is specified', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures');
            const spy = sinon.spy();
            const command = require('../src/platforms');
            command(['ls'], spy);

            expect(spy.calledOnce).to.deep.equals(true);
        });

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

        it('should add a platform project for React Native', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures');

            let commandMock = rewire('../src/add');
            commandMock.__set__('yeoman', {
                createEnv: () => {
                    return {
                        register: () => {},
                        run: (args, callback) => { callback(); },
                    };
                },
            });

            const spy = sinon.spy();
            commandMock('ios', spy);

            expect(spy.calledOnce).to.deep.equals(true);
        });
    });

    describe('rm', () => {

        it('should remove a platform project for React Native', () => {
            process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures');

            let commandMock = rewire('../src/remove');
            let rimrafSpy   = sinon.spy();
            let callbackSpy = sinon.spy();
            commandMock.__set__('rimraf', {
                sync: rimrafSpy,
            });

            commandMock('ios', callbackSpy);

            expect(rimrafSpy.calledOnce).to.deep.equals(true);
            expect(callbackSpy.calledOnce).to.deep.equals(true);
        });

    });

});
