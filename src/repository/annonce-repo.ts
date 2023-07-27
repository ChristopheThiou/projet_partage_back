import { ObjectId } from "mongodb";
import { Annonce } from "../entities";
import { connection } from "./connection";

const collection = connection.db("exo_emprunt").collection<Annonce>("annonces");

export const annonceRepo = {
  findAll() {
    return collection.find().toArray();
  },
  findByName(name: string) {
    return collection.findOne({ name });
  },
  findById(_id: any) {
    return collection.findOne({ _id: new ObjectId(_id) });
  },
  async persist(annonce: Annonce) {
    const result = await collection.insertOne(annonce);
    annonce._id = result.insertedId;
    return annonce;
  },
  remove(_id: string) {
    return collection.deleteOne({ _id: new ObjectId(_id) });
  },
  update(_id: string, annonce: Annonce) {
    return collection.updateOne({ _id: new ObjectId(_id) }, { $set: annonce });
  },
  search(query: any) {
    return collection
      .find({
        $or: [
          { name: { $regex: query } },
          { type: { $regex: query } },
          { status: { $regex: query } },
        ],
      })
      .toArray();
  },
};
