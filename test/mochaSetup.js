const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

chai.use(sinonChai);

const {expect} = chai;

global.expect = expect;
global.sinon = sinon;