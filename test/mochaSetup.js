const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const chaiUuid = require('chai-uuid')

chai.use(sinonChai);
chai.use(chaiUuid);

const {expect} = chai;

global.expect = expect;
global.sinon = sinon;