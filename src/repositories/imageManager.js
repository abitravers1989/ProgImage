module.exports = ({ imagePersister, imageRetriever }) => ({
  saveImage: imageData => imagePersister.saveImage(imageData),
  getImage: imageId => imageRetriever.getImage(imageId),
});