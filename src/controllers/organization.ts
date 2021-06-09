import express, {Request, Response, NextFunction} from 'express';
import createError, {HttpError} from 'http-errors';
import { orgSchema } from '../middlewares/joiValidator';
import orgDB from '../models/orgDetails'


export const postToDb = async(req:Request, res: Response)=>{
  let body = await req.body
    const result = orgSchema.validate(body);
    if(result.error){
      console.log(result.error)
       return  res.status(400).send(result.error.details[0].message);
    }else{
      console.log('i reached here')
        try{
            let { organisation, products, marketValue, ceo, noOfEmployees, country, address, employees} = await req.body;
            const user =  await new orgDB({
                organisation,
                products,
                marketValue,
                ceo,
                noOfEmployees,
                country,
                address,
                employees

            });
          let  data =   await user.save()
            
            if(!data){
              return res.status(400).json({status:"error",message: "please enter a valid data"});
            }
            res.status(201).json({status:"ok",message:"user successfully added to the database",data})
            
        }catch(err){
            res.status(400).json({status:"error", error: err.message});
        }
    }
}

export const updateUser = async (req:Request, res:Response)=>{
    try {
      let user = await orgDB.findByIdAndUpdate(
        req.params.id, req.body);
        let user1 = await orgDB.findById(req.params.id);
      return res.status(200).json(user1);
    } catch (error) {
      console.log(error)
      return res.status(404).json({ message: "Error updating data" });
    }
}

export const deleteRecord = async(req:Request, res:Response)=>{
    
    try{
        const data = await orgDB.findByIdAndDelete(req.params.id)
          return res.status(200).json({message:"Record deleted from database"})
      } catch (error) {
        return res.status(404).json({ message: "Error in deleting data" })
      }
}

export const getAllOrgs = async(req:Request, res:Response)=>{
    try {
      const users = await orgDB.countDocuments();
      let page = Number(req.query.page) || 1;
      let limit = Number(req.query.limit) || 5;
      let skip = (page - 1) * limit;
      let previous: any = (page -1) > 0 ? (page-1) : null; 
      let noOfPages = Math.ceil(users/limit);
      let next: any = (page + 1) > noOfPages ? null : (page+1)
      
      if(page > noOfPages || page < 0){
        return res.status(400).json({status: "error", error:"page not found"})
      }

      const data = await orgDB.find().skip(skip).limit(limit)
      
          return res.status(200).json({
            previous: previous,
            next: next,
            data: data
          })
      } catch (error) {
        res.status(404).json(error.message)
      }
}
export const getSingleOrg = async(req:Request, res:Response)=>{
    try {
        const data = await orgDB.findById(req.params.id)
          return res.status(200).json(data)
      } catch (error) {
        res.status(404).json({ message: "Error getting single data" })
      }
}