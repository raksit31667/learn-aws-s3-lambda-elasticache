import {retrieveSecrets} from './src/retrieve-secrets.mjs';
import {retrieveItemsFromS3} from './src/retrieve-items-from-s3.mjs';
import {updateItemsToRedis} from './src/update-items-to-redis.mjs';

export const run = async (event, context) => {
  try {
    let secrets = await retrieveSecrets('learn-aws-s3-lambda-elasticache');
    let items = await retrieveItemsFromS3('learn-aws-s3-lambda-elasticache',
        'items.csv');
    await updateItemsToRedis(secrets, items);
    return {
      statusCode: 200,
      message: 'OK',
      env: process.env.stage
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error,
      env: process.env.stage
    };
  }
};
