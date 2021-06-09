import User from'../models/registrationSchema';
//import { user } from '../../testDB/fixtures/i';
import mongoose from'mongoose';
import request from'supertest'
//import { create } from'../../services/product';
import app from'../app';


let token:string = "";
let userID: string = "";
import { dbConnect, dbDisconnect, clearDatabase} from '../dbHandler/dbHandler'
const userData:{
    organisation: string,
    products: string[],
    marketValue: string,
    address: string,
    ceo: string,
    country: string,
    noOfEmployees: number,
    employees: string[]

}={
    organisation: "myData.org",
    products: ["google","facebook"],
    marketValue: "100%",
    address:"Sangotedo",
    ceo:"mark Zukerberg",
    country:"America",
    noOfEmployees: 20,
    employees:["David", "Joy"]
}
 const person:{
   firstName:string,
   lastName:string,
   userName: string,
   phone: number,
   password:string
 } ={
  firstName: "userg",
  lastName: "lasty",
  userName: "userlast",
  phone: 999090909,
  password: "123456"
};

const loginCred = {
  userName: "userlast",
  password: "123456"
}
afterAll(async() => {
    await dbDisconnect();
})

describe('User Registers Successfully', ()=>{
    it('User registers successfully', async()=>{
        const result = await request(app)
        .post('/users/register')
        .send(person)

        console.log(result);

        expect(result.status).toBe(201);

        
    })
    it("user login successfully", async()=>{
        const result: request.Response = await request(app)
        .post('/users/login')
        .send(loginCred)
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('token');
        token = result.body.token;
        
    })
})

const updator = {
    ceo: "cnn"
}
describe('create and update organisation', ()=>{
    it('creates organisation successfully', async()=>{
        userData.organisation = "node"
        const result = await request(app)
        .post('/organization')
        .send(userData)
        .set("authorization", `Bearer ${token}`)
        expect(result.status).toEqual(201)
        expect(result.body).toHaveProperty('data')
        expect(result.body.data)
        userID = result.body.data._id
    })
    console.log(userID)
    it('updates an organisation details successfully',async()=>{
        const result: request.Response = await request(app)
        .put(`/organization/${userID}`)
        .send(updator)
        .set(`authorization`, `Bearer ${token}`)
        expect(result.status).toEqual(200)
        expect(result.body.ceo).toEqual("cnn")


    })
})
//
describe('fetch Data', () => {
    it('should fetch all organization', async () => {
      const res: request.Response = await request(app)
        .get('/organization')
        .set('authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('data');
      
    });
    it('should fetch a single organization', async () => {
      const res: request.Response = await request(app)
        .get(`/organization/${userID}`)
        .set('authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
    
    });
  });
  describe('Delete Data', () => {
    it('should delete an organization', async () => {
      const res = await request(app)
        .delete(`/organization/${userID}`)
        .set('authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      
    });
  });