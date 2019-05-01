const {
  server,
  // fileSystem,
  uniqueIDGenerator,
} = require('../../src/container');
const request = require('supertest');

const app = server.start();

afterEach(() => {
  server.stop();
});

describe('GET /getImage', () => {
  describe('when no image conversion type is provided', () => {
    describe('when the given imageID is matched to a valid stored image', () => {
      it('returns a 200 status code and the valid image', () => {
        const validImageID = 'dd301786-9b3a-4972-8be6-e77f2763eaf2';
        // TODO fix this or remove it
        // const expectResult = fileSystem.readFileSync(
        //   `${__dirname}/utils/imageBuffer`,
        // );
        return request(app)
          .get(`/getImage?imageID=${validImageID}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then(response => {
            const result = response.body;
            expect(result.type).to.deep.equal('Buffer');
            // expect(result.data).to.deep.equal(expectResult);
          });
      });
    });

    describe('when the call to the file system fails', () => {
      describe('when no imageID is provided', () => {
        it('returns a 400 with the correct error message', () => {
          const noImageID = '';
          return request(app)
            .get(`/getImage?imageID=${noImageID}`)
            .expect(400)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .then(response => {
              expect(response.text).to.deep.equal(
                'No image ID has been provided.',
              );
            });
        });
      });

      describe('when the given imageID does not match a stored image', () => {
        it('returns a 400 with the correct error message', () => {
          const invalidImageID = uniqueIDGenerator();
          return request(app)
            .get(`/getImage?imageID=${invalidImageID}`)
            .expect(400)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .then(response => {
              expect(response.text).to.deep.equal(
                'There is no image at the provided ID, please ensure it is correct.',
              );
            });
        });
      });

      describe('when the given imageID is not a uuid', () => {
        it('returns a 400 with the correct error message', () => {
          const invalidImageID = 'randomString';
          return request(app)
            .get(`/getImage?imageID=${invalidImageID}`)
            .expect(400)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .then(response => {
              expect(response.text).to.deep.equal(
                'A valid image ID must be provided.',
              );
            });
        });
      });
    });
  });

  describe('when a image conversion type is provided', () => {
    describe('when a valid type is provided', () => {
      // it won't ever return an invalid or no image as this will be an error thrown before it gets to this function
      describe('when a valid image is provided', () => {
        it('returns a 200 and the converted image', async () => {
          const validImageID = '9440a1b8-483b-44ae-a55b-d0d2fdb33294';
          const validImageExtension = 'jpeg';
          let nonConvertedImage;
          await request(app)
            .get(`/getImage?imageID=${validImageID}`)
            .then(response => {
              const result = response.body;
              nonConvertedImage = result.data;
            });

          return request(app)
            .get(`/getImage?imageID=${validImageID}.${validImageExtension}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
              const result = response.body;
              expect(result.type).to.deep.equal('Buffer');
              expect(result.data).to.not.equal(nonConvertedImage);
            });
        });
      });
    });

    describe('when an invalid image extension is provided', () => {
      it('returns a 400 and an error message', () => {
        const validImageID = '9440a1b8-483b-44ae-a55b-d0d2fdb33294';
        const invalidImageExtension = 'svg';

        return request(app)
          .get(`/getImage?imageID=${validImageID}.${invalidImageExtension}`)
          .expect(400)
          .expect('Content-Type', 'text/html; charset=utf-8')
          .then(response => {
            expect(response.text).to.deep.equal(
              'Invalid image extension provided.',
            );
          });
      });
    });

    describe('when no image extension is provided', () => {
      it('returns a 400 and an error message', () => {
        const validImageID = '9440a1b8-483b-44ae-a55b-d0d2fdb33294';
        const invalidImageExtension = 'svg';

        return request(app)
          .get(`/getImage?imageID=${validImageID}.${invalidImageExtension}`)
          .expect(400)
          .expect('Content-Type', 'text/html; charset=utf-8')
          .then(response => {
            expect(response.text).to.deep.equal(
              'Invalid image extension provided.',
            );
          });
      });
    });
  });
});
