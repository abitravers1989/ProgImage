const { createContainer, asFunction, asValue } = require('awilix');

//external dependencies 
const uniqueIDGenerator = require('uuid/v4');
const fileSystem = require('fs');

//internal files
const constants = require('./constants');

const container = createContainer();

container.register({
  uniqueIDGenerator: asValue(uniqueIDGenerator),
  fileSystem: asValue(fileSystem),
  constants: asValue(constants),
});

module.exports = container.cradle