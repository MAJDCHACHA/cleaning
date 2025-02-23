import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

export default router;
