module.exports = ({ imagePesister, imageRetriever }) => ({
  saveImage: imageData => imagePesister.saveImage(imageData),
  getImage: imageId => imageRetriever.getImage(imageId),
});