const { MongoClient } = require('mongodb');

let dbConnection;
const uri = "mongodb+srv://cathy0852753:7JAXNUApLhAviMTt@cathy.sdbfb.mongodb.net/?retryWrites=true&w=majority&appName=cathy";

const connectToDb = async () => {
  try {
    const dbUri = 'mongodb://localhost:27017/';
    const collectionName = 'lulubobo';
    const client = await MongoClient.connect(uri);
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