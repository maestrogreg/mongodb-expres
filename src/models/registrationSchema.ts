import { number } from 'joi';
import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required: true},
    userName: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    phone: {type: Number, required:true},
    createdOn: {default: new Date(), type: Date}
})

const regSchema = mongoose.model('user', registrationSchema);

export default regSchema;