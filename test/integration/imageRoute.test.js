const {
  server,
  fileSystem,
  uniqueIDGenerator,
} = require('../../src/container');
const request = require('supertest');

const app = server.start();

afterEach(() => {
  server.stop();
});

describe('GET /getImage', () => {
  describe('when the given imageID is matched to a valid stored image', () => {
    it('returns a 200 status code and the valid image', () => {
      const validImageID = 'dd301786-9b3a-4972-8be6-e77f2763eaf2';
      const expectResult = fileSystem.readFileSync(
        `${__dirname}/utils/imageBuffer`,
      );
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
      it('returns a 404 with the correct error message', () => {
        const noImageID = '';
        return request(app)
          .get(`/getImage?imageID=${noImageID}`)
          .expect(404)
          .expect('Content-Type', 'text/html; charset=utf-8')
          .then(response => {
            expect(response.text).to.deep.equal(
              'No image ID has been provided.',
            );
          });
      });
    });

    describe('when the given imageID does not match a stored image', () => {
      it('returns a 404 with the correct error message', () => {
        const invalidImageID = uniqueIDGenerator();
        return request(app)
          .get(`/getImage?imageID=${invalidImageID}`)
          .expect(404)
          .expect('Content-Type', 'text/html; charset=utf-8')
          .then(response => {
            expect(response.text).to.deep.equal(
              'There is no image at the provided ID, please ensure it is correct.',
            );
          });
      });
    });

    describe('when the given imageID is not a uuid', () => {
      it('returns a 404 with the correct error message', () => {
        const invalidImageID = 'randomString';
        return request(app)
          .get(`/getImage?imageID=${invalidImageID}`)
          .expect(404)
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