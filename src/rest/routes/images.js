module.exports = ({ logger, fileSystemImageRetriever, sharp }) => ({
  getImage: (req, res) => {
    const requestedImage = req.query.imageID;
   
    const desiredImageExtension = requestedImage.split('.')[1];
    console.log('----->desiredImageExtension', desiredImageExtension)
    
      const imageId = requestedImage.split('.')[0];
    
    let returnImage;
    let transformedImage
    try {  
      console.log('-----?????>', imageId)
      returnImage = fileSystemImageRetriever.getImage(imageId);
      console.log('----->desiredImageExtension', desiredImageExtension)
      if (!desiredImageExtension) {
        return res.status(200).json(returnImage)
      }
      transformedImage = sharp(returnImage)
      .toFormat(desiredImageExtension)
      .toBuffer((error, data, info) => {
        if(error) logger.error(error)
        console.log('-----data>', data)
        return data //.options.input.buffer.data
      })
      console.log('------>jkjkjkjkj', transformedImage.options.input)
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
    return res.status(200).json(transformedImage.options.input.buffer);
  },
});