import express, {Request, Response, NextFunction} from 'express';
import { register, login} from '../controllers/regAndLogin'
const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next:NextFunction) {
  res.render('index', { title: 'Express' });
});

router.post('/register',register);

router.post('/login',login);


export default router;
