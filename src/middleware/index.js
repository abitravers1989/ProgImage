module.exports = ({app, morgan}) => ({
 init: () => {
    app.use(
      morgan('dev', {
        skip: (req, res) => {
          return res.statusCode >= 400
        },
        stream: process.stdout
      })
    );
  }
})