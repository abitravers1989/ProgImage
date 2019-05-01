const { createContainer, asFunction, asValue } = require('awilix');

// External Dependencies
const uniqueIDGenerator = require('uuid/v4');
const fileSystem = require('fs');
const express = require('express');
const getenv = require('getenv');
const validator = require('validator');
const winston = require('winston');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jimp = require('jimp');
const sharp = require('sharp');
// const { isUUID } = require('validator');

// Internal Files
const fileSystemImagePersister = require('./repositories/fileSystemImagePersister');
const fileSystemImageRetriever = require('./repositories/fileSystemImageRetriever');
const imageManager = require('./repositories/imageManager');
const server = require('./server');
const middleware = require('./middleware/index');
const imageRoutes = require('./rest/routes/images');
const routes = require('./rest/index');
const imageTransformer = require('./utils/transformImage');

const container = createContainer();

let envVariables;

try {
  envVariables = getenv.multi({
    PORT: ['PORT', 3000],
    IMAGE_STORE_PATH: ['IMAGE_STORE_PATH'],
  });
  if (!envVariables.IMAGE_STORE_PATH) {
    // TODO isValid method and throw new TypeError
    throw new Error('Folder for image to be saved to must be provided');
  }
} catch (error) {
  winston.error(error, 'Error while loading environment variables');
}

// External Libraries
container.register({
  uniqueIDGenerator: asValue(uniqueIDGenerator),
  fileSystem: asValue(fileSystem),
  app: asFunction(express).singleton(),
  validator: asValue(validator),
  logger: asValue(winston),
  morgan: asValue(morgan),
  bodyParser: asValue(bodyParser),
  jimp: asValue(jimp),
  sharp: asValue(sharp),
});

// Config
container.register({
  envVariables: asValue(envVariables),
});

// Utils
container.register({
  imageTransformer: asValue(imageTransformer({ sharp })),
});

// Rest
container.register({
  server: asFunction(server).singleton(),
  middleware: asFunction(middleware).singleton(),
  routes: asFunction(routes),
  imageRoutes: asFunction(imageRoutes),
});

// Repositories
container.register({
  fileSystemImagePersister: asValue(
    fileSystemImagePersister({ fileSystem, uniqueIDGenerator, envVariables }),
  ),
  fileSystemImageRetriever: asValue(
    fileSystemImageRetriever({ fileSystem, envVariables, validator }),
  ),
  imageManager: asValue(imageManager),
});

module.exports = container.cradle;
