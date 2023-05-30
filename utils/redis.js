/*
 * objective create class RedisClient.
 * the constructor that creates a client to Redis:
    any error of the redis client must be displayed in the console (you should
    use on('error') of the redis client)
 * a function isAlive that returns true when the connection to Redis is a
   success otherwise, false
 * an asynchronous function get that takes a string key as argument and returns
    the Redis value stored for this key
 * asynchronous function set that takes a string key, a value and a duration in
    second as arguments to store it in Redis (with an expiration set by the
    duration argument)
 * asynchronous function del that takes a string key and remove the value in
    Redis for this key
 * finally After the class definition, create and export an instance of
   RedisClient called redisClient
 */
import { createClient } from 'redis';
import { promisify } from 'util';

// class to define methods for commonly used redis commands
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
    });
  }

  // check connection status and report
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  // get value for given key from redis server
  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    const value = await redisGet(key);
    return value;
  }

  // set key value pair to redis server
  async set(key, value, time) {
    const redisSet = promisify(this.client.set).bind(this.client);
    await redisSet(key, value);
    await this.client.expire(key, time);
  }

  // del key vale pair from redis server
  async del(key) {
    const redisDel = promisify(this.client.del).bind(this.client);
    await redisDel(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
