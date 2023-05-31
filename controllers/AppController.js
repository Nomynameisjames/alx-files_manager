/*
 * objective -> file AppController.js that contains the
    definition of the 2 endpoints:
 * GET /status should return if Redis is alive and if the DB is alive too by
    using the 2 utils created previously: { "redis": true, "db": true } with a
    status code 200
 * GET /stats should return the number of users and files in DB: { "users":
    12, "files": 1231 } with a status code 200
    users collection must be used for counting all users
    files collection must be used for counting all files
 */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(request, response) {
    response.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(request, response) {
    const usersNum = await dbClient.nbUsers();
    const filesNum = await dbClient.nbFiles();
    response.status(200).json({ users: usersNum, files: filesNum });
  }
}

module.exports = AppController;
