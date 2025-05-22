const express = require('express');
const { upload } = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const { uploadAndCheck } = require('../controller/factCheckController');
const { optionalAuth } = require('../middleware/optionalAuth');

const router = express.Router();
router.post('/image', protect, upload.single('image'), uploadAndCheck);
router.post('/image', optionalAuth, upload.single('image'), uploadAndCheck);

module.exports = router;
