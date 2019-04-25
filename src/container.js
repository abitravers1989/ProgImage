const { createContainer, asFunction, asValue } = require('awilix');

// External Dependencies
const uniqueIDGenerator = require('uuid/v4');
const fileSystem = require('fs');
const express = require('express');
const getenv = require('getenv');

// Internal Files
const fileSystemImagePesister = require('./repositories/fileSystemImagePesister');
const fileSystemImageRetriever = require('./repositories/fileSystemImageRetriever');
const imageManager = require('./repositories/imageManager');
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
    throw new Error('Folder for image to be saved to must be provided');
  }
} catch (error) {
  //replace with logger 
  console.error(error, 'Error while loading enviornment variables')
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