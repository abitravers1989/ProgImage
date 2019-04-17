module.exports = ({uuidv4}) => ({
  saveImage: (image) => {
    if (!image) {
      throw new Error('No image is provided');
    }
    // if image ==typeOf Images throw error
    console.log('----->', image)
    return uuidv4();
  },
  retrieveImage: (id) => {},
});

// CRUD ..Create Read Update Delete 