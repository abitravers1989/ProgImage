module.exports = ({ logger, fileSystemImageRetriever, jimp, validator }) => ({
  getImage: (req, res) => {
    const { imageID } = req.query;
    const desiredImageExtension = imageID.split('.').pop().toLowerCase();
    const imageIDWithoutExtension = imageID.split('.').slice(0, -1).join('.');
  
    console.log('----->imageIDWithoutExtension', imageIDWithoutExtension)

    let returnImage;
    let newImage;
    try {

      const newImagePath = `${imageID}.${desiredImageExtension}`
      returnImage = fileSystemImageRetriever.getImage(imageIDWithoutExtension);
      jimp.read(returnImage)
      .then(image => {
        return image
          .write(newImagePath)
      })
      .catch(err => {
        logger.error(err)
      })
      //newImage = fileSystemImageRetriever.getImage(newImagePath)

    } catch (error) {
      logger.error(error.message);
      if (error.message.includes('ENOENT')) {
        return res
          .status(404)
          .send(
            'There is no image at the provided ID, please ensure it is correct.',
          );
      }
      return res.status(404).send(error.message);
      // return next(error);
    }
    // logger.info('Successfully returned image from ID:', imageID)
    return res.status(200).json(newImage);
  },
});