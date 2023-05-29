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

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files';
    this._manager = {};
    this._connectToDB();
  }

  async _connectToDB() {
    const client = await MongoClient.connect(`mongodb://${this.host}:${this.port}`,
      { useUnifiedTopology: true });
    this._manager = client.db(this.database);
  }

  isAlive() {
    return !!this._manager;
  }

  async nbUsers() {
    return this._manager.collection('users').countDocuments();
  }

  async nbFiles() {
    return this._manager.collection('files').countDocuments();
  }
}

module.exports = DBClient;
