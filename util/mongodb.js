import { MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  if (!client.isConnected()) await client.connect();
  const db = client.db(MONGODB_DB);
  return { db, client };
}

export { connect };
