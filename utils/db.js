/*
 * objective -> create a file db.js that contains the class DBClient.
 * the constructor that creates a client to MongoDB:
      host: from the environment variable DB_HOST or default: localhost
      port: from the environment variable DB_PORT or default: 27017
      database: from the environment variable DB_DATABASE or default: files
      _manager
 * a function isAlive that returns true when the connection to MongoDB is a
     success otherwise, false
 * an asynchronous function nbUsers that returns the number of documents in the
     collection users
 * an asynchronous function nbFiles that returns the number of documents in the
    collection files
*/
import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';

const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.session = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.session.connect().then(() => {
      this.db = this.session.db(`${DATABASE}`);
    }).catch((err) => {
      console.log(err);
    });
  }

  isAlive() {
    return this.session.isConnected();
  }

  async nbUsers() {
    const users = this.db.collection('users');
    const usersNum = await users.countDocuments();
    return usersNum;
  }

  async nbFiles() {
    const files = this.db.collection('files');
    const filesNum = await files.countDocuments();
    return filesNum;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
