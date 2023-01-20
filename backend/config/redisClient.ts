import * as redis from 'redis';
require('dotenv').config();

const redisClient = async () => {
  const REDIS_HOSTNAME =
    process.env.REDIS_HOSTNAME !== undefined
      ? process.env.REDIS_HOSTNAME
      : '127.0.0.1';

  const redisClient = redis.createClient({
    socket: {
      host: REDIS_HOSTNAME,
      port: 6379,
    },
  });

  redisClient.on('error', (err: any) => console.log(err));

  await redisClient.connect();

  return redisClient;
};

export default redisClient;
