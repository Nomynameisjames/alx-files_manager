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

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  async set(key, value, duration) {
    await this.client.set(key, value);
    await this.client.expire(key, duration);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
