import { Request, Response, NextFunction} from 'express';
import orgDB from '../models/orgDetails'
import jwt from 'jsonwebtoken'

interface User{
    username: string,
    id: string
}
export const auth = async (req:Request, res:Response, next: NextFunction)=>{
    if(!req.headers.authorization){
        res.status(400).json({status:"error", message:"Please ensure you are logged in!"})
    }
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        //let incoming = req.headers.authorization.split(" ")[1];
        try {
            let incoming = req.headers.authorization.split(" ")[1];
            
            console.log(process.env.JWT_SECRET as string);
            const decoded= jwt.verify(incoming, process.env.JWT_SECRET as string) as User;
           // const user = await orgDB.findById(decoded.id);
            req.user = decoded.username;
            next();
        } catch (error) {
            res.status(401).json({status:"error", message:"Not Authorised, invalid token"});
        }
    }
}