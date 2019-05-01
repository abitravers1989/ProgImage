module.exports = ({ sharp }) => ({
  convertImage: async (image, desiredImageExtension) => {
    if (!image) throw new Error('No image provided.');
    //TODO refactor this out to a constant file
    const supportedImageExtensions = ['jpeg', 'png', 'webp', 'tiff', 'gif'] 
    if (!supportedImageExtensions.includes(desiredImageExtension)) {
      throw new Error('Invalid image extension provided.');
    }
    return await sharp(image)
      .toFormat(desiredImageExtension)
      .toBuffer();
  },
});
