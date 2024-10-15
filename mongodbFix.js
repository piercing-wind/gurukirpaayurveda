
/***
 * 
 * Do not Execute this file, this is just for reference
 */


const { v4: uuidv4 } = require('uuid');

const MongoClient = require('mongodb').MongoClient;

async function deleteAllOrders() {
   const uri = 'mongodb+srv://gurukirpa:EwtNBWU9Iek0HpdB@gurukirpa-ayurveda-clus.wzocq.mongodb.net/gurukirpa_ayurveda_database?retryWrites=true&w=majority&appName=gurukirpa-ayurveda-cluster'; // Replace with your MongoDB connection string
   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

   try {
      await client.connect();
      const database = client.db('gurukirpa_ayurveda_database');
      const collection = database.collection('Order');

      const result = await collection.deleteMany({});
      console.log(`Deleted ${result.deletedCount} records from the Order collection`);
   } finally {
      await client.close();
   }
}

deleteAllOrders().catch(console.error);