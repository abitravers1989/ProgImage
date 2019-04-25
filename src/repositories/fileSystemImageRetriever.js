module.exports = ({ fileSystem, envVariables }) => {
  return {
    getImage: imageID => {
      if (!imageID) throw new Error('No identfier provided to retrieve image');

      return fileSystem.readFileSync(`${envVariables.IMAGESTOREPATH}/${imageID}`);
    },
  };
};


