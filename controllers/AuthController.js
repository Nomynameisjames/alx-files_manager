/*
 * objective => GET /connect should sign-in the user by generating a new
   authentication token:
 * By using the header Authorization and the technique of the Basic auth
   (Base64 of the <email>:<password>), find the user associate to this email
   and with this password (reminder: we are storing the SHA1 of the password)
 * If no user has been found, return an error Unauthorized with a status code
   401
 * else: Generate a random string (using uuidv4) as token
        Create a key: auth_<token>
        Use this key for storing in Redis (by using the redisClient create
        previously) the user ID for 24 hours
        Return this token: { "token": "155342df-2399-41da-9e8c-458b6ac52a0c" }
        with a status code 200
  * GET /disconnect should sign-out the user based on the token:
            Retrieve the user based on the token:
            If not found, return an error Unauthorized with a status code 401
            else delete the token in Redis and return nothing with a status
            code 204
  */
import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AuthController {
  static async getConnect(request, response) {
    const { authorization } = request.headers;
    const base64Credentials = authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    if (!email || !password) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    const user = await dbClient.db.collection('users').findOne({ email, password: sha1(password) });
    if (!user) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    const token = uuidv4();
    const key = `auth_${token}`;
    await redisClient.set(key, user._id.toString(), 86400);
    return response.status(200).json({ "token": token });
  }

  static async getDisconnect(request, response) {
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];
    const key = `auth_${token}`;
    const userId = await redisClient.get(key);
    if (!userId) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    await redisClient.del(key);
    return response.status(204).json();
  }
}

module.exports = AuthController;
