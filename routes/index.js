/*
 * objective ->  file index.js that contains all endpoints of our API:
 * GET /status => AppController.getStatus
 * GET /stats => AppController.getStats
 */
import { Router } from 'express';
import AppController from '../controllers/AppController';

const router = Router();
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
