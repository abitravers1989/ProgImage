1. Read images and return unique id
2. Retrieve images by passing that unique id


Stages:

1.  Build a simple microservice that can receive an uploaded image and return a unique identifier for the uploaded image that can be used subsequently to retrieve the image. 
Completed at: commit 46d70bee07fa2cb1b18c83361981acacc823dc8d.

 

2.  Extend the microservice so that different image formats can be returned by using a different image file type as an extension on the image request URL.



//use a database? need info on how this is going to be used. 
argument for db or not ?




operate on images
provided as data in a request, operate on a remote image
via a URL, or on images that are already in the repository.


TODO
add linting 
image validation
error logging



NEXT : 

dont use constants use envVars
ADD LOGGER
add middleware

stop method for server

 if(!envVariables.IMAGESTOREPATH) {
    // do isValid method and throw new TypeError
  container

check constants in starup of app and throw error there
make an API 
save image extension ?
allow conversion of extension 


make hash from image unique id so doesn't save same image twice..? for integration tests keep having to delete them


save file extension
add rest api

refactor validation and find libary for validating it is image?
add logger



use SW instead of local file system? benefits?
caching?


additional ? add delete etc?