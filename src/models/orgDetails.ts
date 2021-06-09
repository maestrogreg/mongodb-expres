import mongoose from 'mongoose';

const orgDetails = new mongoose.Schema({
    organisation: {type:String},
    products: {type: Array, required: true},
    marketValue: {type: String, required: true},
    ceo: {type:String, required: true},
    noOfEmployees: {type: Number, required: true},
    employees: {type: Array, required: true},
    address: {type: String, required: true},
    country: {type: String, required: true}
},{
    timestamps: true
})

const orgDB = mongoose.model('organisation', orgDetails);

export default orgDB;