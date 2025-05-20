const express = require('express');
const { upload } = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const { uploadAndCheck } = require('../controller/factCheckController');
const router = express.Router();

router.post('/image', protect, upload.single('image'), uploadAndCheck);

module.exports = router;
