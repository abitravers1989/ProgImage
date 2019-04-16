const { createContainer, asFunction, asValue } = require('awilix');

//external dependencies 
const uuidv4 = require('uuid/v4');

const container = createContainer();

container.register({
  uuidv4: asValue(uuidv4),
});

module.exports = container.cradle