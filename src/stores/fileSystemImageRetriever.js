module.exports = ({ fileSystem, constants }) => {
  // this should only be checked once on startup of the app
  if (!constants.IMAGESTOREPATH)
    throw new Error(
      'Folder for image to be saved to must be provided in constants folder',
    );
  return {
    getImage: imageID => {
      if (!imageID) throw new Error('No identfier provided to retrieve image');

      return fileSystem.readFileSync(`${constants.IMAGESTOREPATH}/${imageID}`);
    },
  };
};


