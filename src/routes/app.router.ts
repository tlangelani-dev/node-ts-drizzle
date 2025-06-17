import { Router } from 'express';
import { appHealth, appWelcome } from '@/controllers/app.controller';

const router = Router();

router.get('/', appWelcome);
router.get('/health', appHealth);

export default router;
