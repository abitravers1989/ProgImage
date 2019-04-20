const { createContainer, asFunction, asValue } = require('awilix');

//external dependencies 
const uuidv4 = require('uuid/v4');
const fileSystem = require('fs');

const container = createContainer();

container.register({
  uuidv4: asValue(uuidv4),
  fileSystem: asValue(fileSystem),
});

module.exports = container.cradle