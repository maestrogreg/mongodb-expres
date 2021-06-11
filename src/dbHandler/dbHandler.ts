import mongoose from 'mongoose';
import { MongoMemoryServer }  from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export const dbConnect = async () =>{
    const uri = await mongod.getUri();
    //const mongooseOpts = ;
     mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(_=>console.log("connected to mongo"))
    .catch(_=>console.log("notConnected to mongo"))
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