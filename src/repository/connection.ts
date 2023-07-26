import { MongoClient } from "mongodb";


export const connection = new MongoClient(process.env.DATABASE_URL!);

const cleanup = () => {
  connection.close();
  process.exit();
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);