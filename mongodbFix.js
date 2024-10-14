
/***
 * 
 * Do not Execute this file, this is just for reference
 */


const { v4: uuidv4 } = require('uuid');
const MongoClient = require('mongodb').MongoClient;

// async function updateGatewayOrderIds() {
//    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 
//    try {
//      await client.connect();
//      const database = client.db('gurukirpa_ayurveda_database');
//      const collection = database.collection('Order');
 
//      const cursor = collection.find({ gateway_order_id: { $in: [null, ''] } });
 
//      while (await cursor.hasNext()) {
//        const doc = await cursor.next();
//        const newGatewayOrderId = uuidv4();
//        await collection.updateOne(
//          { _id: doc._id },
//          { $set: { gateway_order_id: newGatewayOrderId } }
//        );
//      }
 
//      console.log('Updated all records with unique gateway_order_id');
//    } finally {
//      await client.close();
//    }
//  }
 
//  updateGatewayOrderIds().catch(console.error);