import express, {Request, Response, NextFunction} from 'express'
import { schema, registerSchema } from '../middlewares/joiValidator'
import regSchema from '../models/registrationSchema'
import { encryptor, tokenGen } from '../helpers/helper'
import createError, {HttpError} from 'http-errors';
import bcrypt from 'bcrypt'

export const register = async (req:Request, res:Response) => {
    let { userName, password, firstName, lastName, phone} = req.body;
    const result = registerSchema.validate(req.body);
    const user = await regSchema.findOne({userName});
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }else if(user){
        res.status(400).send({status: 'error', message:"user already exists!"});
    }else{
        const user = new regSchema({
            firstName,
            lastName,
           userName: userName.toLowerCase(),
           password: await encryptor(password),
           phone
        });
        user.save(user)
        .then((data: any) =>{
            res.status(201).json({status:"ok",message:"user successfully added to the database", user})
        })
        .catch((error:HttpError) =>{
            res.status(400).json({status:"error", message:`${error.message}`});
        })
    }

};

export const login = async (req:Request, res:Response) => {
    
    const result = schema.validate(req.body);
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }else{
        try{
            let { userName, password} = req.body;
            userName = userName.toLowerCase();
            const user = await regSchema.findOne({userName}).lean();
        const result = await bcrypt.compare(password, user.password);
        if(result == false){
            res.status(400).json({status:"error", error:"failed to login, enter valid details"})
        }else{
            const token = await tokenGen({username:user.userName, id:user._id});
            
            res.status(200).json({ user, token});
        }
        }catch(err){
            res.status(400).json({status:"error", error: err.message})
        }
    }
    
}

export const deleteUser = async (req:Request, res:Response) => {
    const { username, password} = req.body;
    
}

export const updateUser = async (req:Request, res:Response) => {
    const { username, password} = req.body;
    
}