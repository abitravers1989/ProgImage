module.exports = ({imageRoutes}) => ({
  setupEndpoints: app => {
    //TODO wrap in try catch
    // try {
      
    // }
    //e.g http://localhost:3000/getImage?imageID=dd301786-9b3a-4972-8be6-e77f2763eaf2
    app.get('/getImage', imageRoutes.getImage)
  }
})