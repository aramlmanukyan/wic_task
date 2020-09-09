import { Router } from 'express';
import getData from '../../controllers/data.controller';

const router: Router = Router();

router
  .get('/get_data', getData.companiesData)
  .get('/get_data/:searchStr', getData.companiesData)
  .get('/users_tasks', getData.getUsersAndTasks)
  .get('/by_post_count', getData.getUsersByPostCount);

export default router;
