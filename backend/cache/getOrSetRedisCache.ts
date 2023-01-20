import redisClient from '../config/redisClient';

const getOrSetRedisCache = async (key: string, callback: () => any) => {
  return new Promise(async (resolve, reject) => {
    const connectedRedisClient = await redisClient();

    const redisData = await connectedRedisClient.get(key);

    if (redisData === null) {
      const data = await callback();
      await connectedRedisClient.set(key, JSON.stringify(data));
      resolve(data);
    }

    if (redisData !== null) {
      resolve(JSON.parse(redisData));
    }
  });
};

export default getOrSetRedisCache;
