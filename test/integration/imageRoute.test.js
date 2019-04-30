const {
  server,
  fileSystem,
  uniqueIDGenerator,
} = require('../../src/container')
const request = require('supertest');

app = server.start()

describe.only('GET /getImage', () => {
  describe('when the given imageID is matched to a valid stored image', () => {
    it('returns a 200 status code and the valid image', () => {
      const validImageID = 'dd301786-9b3a-4972-8be6-e77f2763eaf2'
      const expectResult = fileSystem.readFileSync(__dirname + '/utils/imageBuffer')
      request(app)
      .get(`/getImage?imageID=${validImageID}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const result = response.body.returnImage
        expect(result.type).to.deep.equal('Buffer')
        expect(result.data).to.deep.equal(expectResult)
      })
    })
  })
})



'when the given imageID does not match a stored image'