import mongoose from 'mongoose';
import { MongoMemoryServer }  from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export const dbConnect = async () =>{
    const uri = await mongod.getUri();
    //const mongooseOpts = ;
    await mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

export const dbDisconnect = async() =>{
    //await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongod.stop();
}

export const clearDatabase = async () =>{
    const collections = mongoose.connection.collections;
    for(const key in collections){
        const collection = collections[key];
       // await collection.deleteMany(1);
    }
}