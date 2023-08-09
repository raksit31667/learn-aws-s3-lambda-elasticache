import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const retrieveItemsFromS3 = async (bucketName, objectKey) => {
  const client = new S3Client(getS3Configuration());
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });
  console.log(`Connecting to S3 ${bucketName} with ${objectKey}...`);
  try {
    const s3Object = await client.send(command);
    const bodyString = await s3Object.Body.transformToString();
    return bodyString.replace(/\r/g, '').split('\n').slice(1);
  } catch (error) {
    console.error(`ERROR: ${error}`);
    throw error;
  }
};

const getS3Configuration = () => {
  if (process.env.stage === 'local') {
    return {
      endpoint: 'http://localhost:4566',
      region: 'ap-southeast-1',
      forcePathStyle: true,
      credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test'
      }
    };
  } else {
    return {
      region: 'ap-southeast-1'
    };
  }
}