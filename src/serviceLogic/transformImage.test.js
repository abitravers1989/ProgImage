const transformImageFactory = require('./transformImage')

describe('Image transformer', () => {
  const sandbox = sinon.createSandbox();
  const dependencies = {
    sharp: sandbox.stub().returns(
      {
        toFormat: sandbox.stub().returns(
          {
            toBuffer: sinon.spy(),
          }
        )
      }
    )
  }
  
  const transformImage = transformImageFactory(dependencies)
  const {sharp} = dependencies

  afterEach(() => sandbox.reset());
  
  after(() => sandbox.restore());
  
  describe.only('convertImage', () => {
    it('formats the image to the desired image extension',  async () => {
      const desiredImageExtension = 'jpeg'
      const imageToBeTransformed = '[37, 2666, 78, 00, 33]'
    
      await transformImage.convertImage(imageToBeTransformed, desiredImageExtension)
  
      expect(sharp).to.have.been.calledWithExactly(imageToBeTransformed)
      // TODO change this to yields and make sharp return these functions
      const toFormat = sharp().toFormat
      const toBuffer = sharp().toFormat().toBuffer
      expect(toFormat).to.have.been.calledWithExactly(desiredImageExtension)
      expect(toBuffer).to.have.been.called
    })

    describe('when the call to sharp fails', () => {
      it('throws an error if no no image is provided', () => {
        
      })
    })
  })

})

  // const mockSharp = {
      //   toFormat: sandbox.stub()
      // }

      // const ss = {
      //   toBuffer: sandbox.stub()
      // }
      // const newSharp = sharp.returns(mockSharp)
      // newSharp.returns(ss)
      // newSharp.yield





