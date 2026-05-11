import { Router } from 'express';
import { predictHandler } from './fastapi.controller.js';

const router = Router();

// POST /api/v1/complaints/predict -> proxies to FastAPI /predict
router.post('/predict', predictHandler);

export default router;
