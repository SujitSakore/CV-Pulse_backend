import express from 'express';
import multer from 'multer';
import { analyzeResume } from '../controllers/resumeController.mjs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/analyze', upload.single('resume'), analyzeResume);

export default router;
