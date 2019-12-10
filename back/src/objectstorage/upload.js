import S3 from './config';


const options = {
  partSize: 10 * 1024 * 1024, // 10MB
};

export default async (stream, filename) => {
  const type = filename.slice(filename.lastIndexOf('.') + 1, filename.length);
  return S3.upload({
    Bucket: process.env.OBJECT_STORAGE_IMAGE_BUCKET,
    Key: filename,
    ACL: 'public-read',
    Body: stream(),
    ContentType: `image/${type}`,
  }, options).promise();
};
