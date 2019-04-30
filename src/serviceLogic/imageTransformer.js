// module.exports = ({ sharp }) => ({
//   convertImage: (image, desiredImageType) =>
//     sharp(image)
//       .toFormat(desiredImageType)
//       .toBuffer((error, data) => {
//         if (error) {
//           // throw new Error(
//           //   `An error occurred while transforming the image: ${error.message}`
//           // );
//           console.log('----->', error)
//         }
//         console.log('----->desiredImageType',desiredImageType )
//         return data;
//       }),
// });