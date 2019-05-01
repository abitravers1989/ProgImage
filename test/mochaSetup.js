const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const chaiUuid = require('chai-uuid')
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiUuid);
chai.use(chaiAsPromised)

const {expect} = chai;

global.expect = expect;
global.sinon = sinon;