import redisClient from '../config/redisClient';

const flushRedis = async () => {
  const connectedRedisClient = await redisClient();

  await connectedRedisClient.flushAll();
};

export default flushRedis;
