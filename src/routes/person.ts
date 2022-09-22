import { Router } from 'express';
import { create, find, list } from '../controller/person';

const router = Router();

router.route('/person').get(list).post(create);
router.route('/person/:id').get(find);
export default router;