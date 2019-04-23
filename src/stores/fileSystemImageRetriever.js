//why inject them as an object?
module.exports = ({ fileSystem, constants }) => {
  if (!constants.IMAGESTOREPATH)
  throw new Error(
    'Folder for image to be saved to must be provided in constants folder',
  );
return {
  retrieveImage: imageID => {
    if (!imageID) throw new Error('No identfier provided to retrieve image');

    return fileSystem.readFileSync(`${constants.IMAGESTOREPATH}/${imageID}`);
  }
}
}

