const express = require('express');
const { upload } = require('../middleware/upload');
const { optionalAuth } = require('../middleware/optionalAuth');
const { uploadAndCheck } = require('../controller/factCheckController');

const router = express.Router();

router.post('/image', optionalAuth, upload.single('image'), uploadAndCheck);

module.exports = router;
