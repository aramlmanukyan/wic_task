import { Router } from 'express';
import data from './data.router';
// import users from './users/user.route';

const router: Router = Router();

// router.use('/', auth);
router.use('/data', data);

export default router;