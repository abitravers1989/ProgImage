const { createContainer, asFunction, asValue } = require('awilix');

// external dependencies
const uniqueIDGenerator = require('uuid/v4');
const fileSystem = require('fs');

// internal files
const constants = require('./constants');
const fileSystemImagePesister = require('./stores/fileSystemImagePesister');
const fileSystemImageRetriever = require('./stores/fileSystemImageRetriever');
const imageManager = require('./stores/imageManager');

const container = createContainer();

container.register({
  uniqueIDGenerator: asValue(uniqueIDGenerator),
  fileSystem: asValue(fileSystem),
  constants: asValue(constants),
  fileSystemImagePesister: asValue(fileSystemImagePesister),
  fileSystemImageRetriever: asValue(fileSystemImageRetriever),
  imageManager: asValue(imageManager),
});

module.exports = container.cradle;