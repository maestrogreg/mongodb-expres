const regModel = require('../dist/models/registrationSchema').default;

exports.create = async(user)=>{
    if(!user){
        throw new Error('user missing');

        await regModel.create(user);
    }
}

// exports.getAllUsers = async()=>{
//     //if(!user){
    
//         throw new Error('user missing');
//         const data = await regModel.find().skip(0).limit(10);
//         if()
//        // await regModel.create(user);
//     //}
// }