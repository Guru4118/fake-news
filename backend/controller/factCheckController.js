const fs = require('fs');
const tesseract = require('tesseract.js');
const { analyzeText } = require('../utils/openaiCheck');
const { generatePDFReport } = require('../utils/generatePDF');

exports.uploadAndCheck = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ msg: 'No image file uploaded' });
    }

    const imagePath = req.file.path;
    console.log('[INFO] Image uploaded at:', imagePath);

    // 1. Handle Free Trials for Guest Users
    if (!req.user) {
      if (!req.session.trialCount) req.session.trialCount = 0;

      if (req.session.trialCount >= 5) {
        return res.status(403).json({ msg: 'Free trial limit exceeded. Please login to continue.' });
      }

      req.session.trialCount += 1;
      console.log(`[INFO] Guest trial used. Count: ${req.session.trialCount}/5`);
    }

    // 2. OCR Extraction
    console.log('[INFO] Running OCR...');
    const {
      data: { text }
    } = await tesseract.recognize(imagePath, 'eng');

    if (!text.trim()) {
      return res.status(400).json({ msg: 'No text detected in the image.' });
    }

    console.log('[INFO] OCR Text Extracted:', text.slice(0, 100), '...');

    // 3. AI Analysis
    console.log('[INFO] Sending text to AI for analysis...');
    const result = await analyzeText(text);
    console.log('[INFO] AI analysis completed:', result);

    // 4. PDF Generation
    console.log('[INFO] Generating PDF report...');
    const pdfFile = await generatePDFReport({
      extractedText: text.trim(),
      verdict: result.verdict,
      explanation: result.explanation,
      confidence: result.confidence,
      sources: result.sources
    });

    console.log('[INFO] PDF generated at:', `/uploads/${pdfFile}`);

    // 5. Send Response
    res.json({
      extractedText: text.trim(),
      verdict: result.verdict,
      confidence: result.confidence,
      explanation: result.explanation,
      sources: result.sources,
      pdf: `/uploads/${pdfFile}`,
      trialsUsed: req.session?.trialCount || 0,
      trialsRemaining: req.user ? 'Unlimited' : 5 - (req.session?.trialCount || 0)
    });
  } catch (error) {
    console.error('[ERROR]', error);
    res.status(500).json({
      msg: 'Failed to process the image',
      error: error.message,
      stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    });
  }
};
