import S3 from './config';

export default (filename) => S3.deleteObject({
  Bucket: process.env.OBJECT_STORAGE_IMAGE_BUCKET,
  Key: filename,
}).promise();
