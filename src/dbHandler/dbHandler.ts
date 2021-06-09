import mongoose from 'mongoose';
import { MongoMemoryServer }  from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export const dbConnect = async () =>{
    const uri = await mongod.getConnectionString();
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        recconectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    };
    await mongoose.connect(uri, mongooseOpts);
}

export const dbDisconnect = async() =>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

export const clearDatabase = async () =>{
    const collections = mongoose.connection.collections;
    for(const key in collections){
        const collection = collections[key];
       // await collection.deleteMany(1);
    }
}