import { ObjectId } from "mongodb";
import { User } from "../entities";
import { connection } from "./connection";

const collection = connection.db("exo_emprunt").collection<User>("user");

export const userRepo = {
  findAll() {
    return collection.find().toArray();
  },
  findByName(name: string) {
    return collection.findOne({ name });
  },
  findById(_id: any) {
    return collection.findOne({ _id: new ObjectId(_id) });
  },
  async persist(user: User) {
    const result = await collection.insertOne(user);
    user._id = result.insertedId;
    return user;
  },
  remove(_id: string) {
    return collection.deleteOne({ _id: new ObjectId(_id) });
  },
  update(_id: string, user: User) {
    return collection.updateOne({ _id: new ObjectId(_id) }, { $set: user });
  },
};
