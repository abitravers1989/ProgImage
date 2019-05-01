module.exports = ({ sharp }) => ({
  convertImage: (image, desiredImageExtension) =>
    sharp(image)
      .toFormat(desiredImageExtension)
      .toBuffer(),
});

