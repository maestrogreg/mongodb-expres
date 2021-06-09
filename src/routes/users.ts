import express, {Request, Response, NextFunction} from 'express';
import { postToDb, updateUser, deleteRecord, getSingleOrg, getAllOrgs } from '../controllers/organization'
import { auth } from '../middlewares/auth'
const router = express.Router();

/* GET home page. */
router.get('/:id',auth, getSingleOrg);
router.get('/', auth, getAllOrgs);
router.post('/',auth, postToDb);
router.put('/:id',auth, updateUser);
router.delete('/:id',auth, deleteRecord);

export default router;