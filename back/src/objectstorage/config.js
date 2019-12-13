import AWS from 'aws-sdk';

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const accessKey = process.env.OBJECT_STORAGE_ACCESS_KEY;
const secretKey = process.env.OBJECT_STORAGE_SECRET_KEY;

AWS.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

const S3 = new AWS.S3({
  endpoint, region,
});

export default S3;
