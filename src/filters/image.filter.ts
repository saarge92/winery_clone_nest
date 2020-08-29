export const imageFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Доступны только изображения!'), false);
  }
  callback(null, true);
};