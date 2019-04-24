const { createContainer, asFunction, asValue } = require('awilix');

// External Dependencies
const uniqueIDGenerator = require('uuid/v4');
const fileSystem = require('fs');
const express = require('express');
const getenv = require('getenv');

// Internal Files
const constants = require('./constants');
const fileSystemImagePesister = require('./stores/fileSystemImagePesister');
const fileSystemImageRetriever = require('./stores/fileSystemImageRetriever');
const imageManager = require('./stores/imageManager');
const server = require('./server');

const container = createContainer();

let envVariables;

try {
  envVariables = getenv.multi({
    PORT: ['PORT', 3000],
    IMAGESTOREPATH: ['IMAGESTOREPATH']
  })
  if(!envVariables.IMAGESTOREPATH) {
    // do isValid method and throw new TypeError
    throw new Error('Folder for image to be saved to must be provided in constants folder');
  }
} catch (error) {
  //replace with logger 
  console.fatal(error, 'Error while loading enviornment variables')
}

// External Libaries
container.register({
  uniqueIDGenerator: asValue(uniqueIDGenerator),
  fileSystem: asValue(fileSystem),
  app: asFunction(express).singleton(),
});

// Config 
container.register({
  envVariables: asValue(envVariables),
  constants: asValue(constants),
});

// Utils

// Rest
container.register({
  server: asFunction(server).singleton(),
});

// Repositories
container.register({
  fileSystemImagePesister: asValue(fileSystemImagePesister),
  fileSystemImageRetriever: asValue(fileSystemImageRetriever),
  imageManager: asValue(imageManager),
});

module.exports = container.cradle;