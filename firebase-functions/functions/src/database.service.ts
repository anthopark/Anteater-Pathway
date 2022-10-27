import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

export const collections: { courses?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client = new mongoDB.MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  const db = client.db(process.env.DB_NAME);

  collections.courses = db.collection('courses');
}
