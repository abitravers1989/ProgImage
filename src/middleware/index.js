module.exports = ({ app, morgan, bodyParser }) => ({
  init: () => {
    app.use(
      morgan('dev', {
        skip: (req, res) => res.statusCode >= 400,
        stream: process.stdout,
      }),
    );
    app.use(bodyParser.json());
  },
});
