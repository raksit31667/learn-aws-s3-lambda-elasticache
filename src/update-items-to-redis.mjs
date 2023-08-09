import Redis from 'ioredis';

export const updateItemsToRedis = async (secrets, items) => {
  let redisUrl;
  if (!secrets.REDIS_PASSWORD) {
    redisUrl = `redis://:${secrets.REDIS_ENDPOINT}:${secrets.REDIS_PORT}`;
  } else {
    redisUrl = `rediss://:${secrets.REDIS_PASSWORD}@${secrets.REDIS_ENDPOINT}:${secrets.REDIS_PORT}`;
  }
  const redisClient = new Redis(redisUrl, {
    connectTimeout: 5000,
    commandTimeout: 5000,
  });
  const pipeline = redisClient.pipeline();
  items.forEach((item) => {
    const [itemCode, discountPercentage] = item.split(',');
    pipeline.hset(`Item:${itemCode}`, {
      itemCode,
      discountPercentage,
    });
  });
  await pipeline.exec((error) => {
    if (error) {
      console.log(`Update items error: ${error}`);
      return;
    }
    console.log('Update items successful');
  });
};
