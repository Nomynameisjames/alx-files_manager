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

class RedisClient {
 constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
    this.client.on('close', () => {
      this.isClientConnected = false;
    });
  }

  isAlive() {
    return this.isClientConnected;
  }

  async get(key) {
    if (!this.isClientConnected) {
      throw new Error('Redis client is not connected');
    }
    return promisify(this.client.GET).bind(this.client)(key);
  }

  async set(key, value, duration) {
    if (!this.isClientConnected) {
      throw new Error('Redis client is not connected');
    }
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  async del(key) {
    if (!this.isClientConnected) {
      throw new Error('Redis client is not connected');
    }
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;

