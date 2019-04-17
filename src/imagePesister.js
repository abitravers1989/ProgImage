module.exports = ({uuidv4}) => ({
  saveImage: (image) => {
    // try {
      if (!image) {
        throw new Error('No image is provided');
      }
      return uuidv4();
    // } catch(error) {
    //   console.log('------>',error)
    // }
    // if image ==typeOf Images throw error
    
  },
  retrieveImage: (id) => {},
});

// CRUD ..Create Read Update Delete 