module.exports = ({uuidv4}) => ({
  saveImage: (image) => {
    return uuidv4();
  },
  retrieveImage: (id) => {},
});

// CRUD ..Create Read Update Delete 