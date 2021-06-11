import mongoose from 'mongoose';
import { MongoMemoryServer }  from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export const dbConnect = async () =>{
    try {
        const uri = await mongod.getConnectionString();
        //const mongooseOpts = ;
         await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("connected to mongo")
        
    } catch (error) {
        
        console.log("notConnected to mongo")
    }
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