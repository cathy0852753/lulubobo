require('dotenv').config();
const { MongoClient } = require('mongodb');

let dbConnection;
//process.env.DB_URI || 
const uri = 'mongodb://localhost:27017/lulubobo';

const connectToDb = async () => {
  try {
    console.log(uri);
    const collectionName = 'lulubobo';
    const client = await MongoClient.connect(uri);
    console.log(client);
    dbConnection = client.db(collectionName);
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};

const getDb = () => {
  if (!dbConnection) {
    throw new Error('No database connection.');
  }
  return dbConnection;
};

module.exports = { connectToDb, getDb };