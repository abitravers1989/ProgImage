# ProgImage service 

A service for saving, retrieving and converting images.

# Installation

`npm install`

# Configuration

All configuration is done using environment variables, the following are required:

- **PORT** - Port to run the server on. Defaults to 3000. _Optional_
- **IMAGE_STORE_PATH** - This is the location in the file directory which you want the images to be stored in. To create it first add the path to this application directory then add the name of the folder you want to store images in.

To run this locally please create a .env in the route of this directory with the above in. See the .env.example. 

# Running

Standalone app start - `npm start`

# Retrieving an image 

To retrieve an image via the api, hit the /getImage endpoint passing it a `imageID` query param which contains the ID which the image has been saved as. Please run the integration tests to save an image before hand and look in the folder you chose for `IMAGE_STORE_PATH`.

For example:

`http://localhost:3000/getImage?imageID=9440a1b8-483b-44ae-a55b-d0d2fdb33294`

# Saving an image 

As an MVP this service does not provide a request url to save images. If you wish to save images please run the `fileSystemImageManager.test` integration test. Please do this before attempting to retrieve any images.

# Converting an Image to a desired type

The following image types are supported for conversion:
```
'jpeg', 'png', 'webp', 'tiff', 'gif'
```

To receive an image as a type different to what it was saved as the `imageID` query param must contain the desired image type after the image id. For example:

`http://localhost:3000/getImage?imageID=9440a1b8-483b-44ae-a55b-d0d2fdb33294.png`

If a non-supported image type is used an error message will be returned.

# EndPoints 

urlforservice/getImage?imageID=

/getImage is not available without the imageID query param.

# Testing

### All tests

Run all unit and integration tests

```
$ npm t
```

### Unit tests

Run just unit tests

```
$ npm run test:unit

# Coverage report
$ npm run test:coverage
```

### Integration tests

Run just unit tests

```
$ npm run test:unit
```

# Requirements for current service

1.  Build a simple microservice that can receive an uploaded image and return a unique identifier for the uploaded image that can be used subsequently to retrieve the image. 

2.  Extend the microservice so that different image formats can be returned by using a different image file type as an extension on the image request URL.

# Further work

Add save endpoint. (then remove imageManager & it's integration test.)
Unit test parts which are not covered (including parts of server file).
Add linting.
Add output for logger, even just local file.
Deploy app to aws ec2 instance.
Improve performance of conversions.
Docker-ise app and integration tests. 
Save images to a relational database once more images are being stored and performance is effected. Can get performance gains from it's indexing. 