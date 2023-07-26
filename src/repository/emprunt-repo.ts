import { ObjectId } from "mongodb";
import { Emprunt } from "../entities";
import { connection } from "./connection";

const collection = connection.db("exo_emprunt").collection<Emprunt>("emprunts");

export const empruntRepo = {
  findAll() {
    return collection.find().toArray();
  },
  findById(_id: any) {
    return collection.findOne({ _id: new ObjectId(_id) });
  },
  async persist(emprunt: Emprunt) {
    const result = await collection.insertOne(emprunt);
    emprunt._id = result.insertedId;
    return emprunt;
  },
  remove(_id: string) {
    return collection.deleteOne({ _id: new ObjectId(_id) });
  },
  update(_id: string, emprunt: Emprunt) {
    return collection.updateOne({ _id: new ObjectId(_id) }, { $set: emprunt });
  },
};