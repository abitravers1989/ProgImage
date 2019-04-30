module.exports = ({ sharp }) => ({
  convertImage: (returnImage, desiredImageExtension) =>
    sharp(returnImage)
      .toFormat(desiredImageExtension)
      .toBuffer(),
});

