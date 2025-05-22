const fs = require('fs');
const tesseract = require('tesseract.js');
const { analyzeText } = require('../utils/openaiCheck');
const { generatePDFReport } = require('../utils/generatePDF');

exports.uploadAndCheck = async (req, res) => {
  try {
    console.log('[DEBUG] Incoming file:', req.file);

    if (!req.file?.path) {
      return res.status(400).json({ msg: 'No image uploaded' });
    }

    const imagePath = req.file.path;

    // Trial logic
    if (!req.user) {
      if (!req.session.trialCount) req.session.trialCount = 0;
      if (req.session.trialCount >= 5) {
        return res.status(403).json({ msg: 'Free trial limit exceeded. Please login to continue.' });
      }
      req.session.trialCount += 1;
    }

    console.log('[DEBUG] Running OCR on:', imagePath);
    const { data: { text } } = await tesseract.recognize(imagePath, 'eng');
    console.log('[DEBUG] OCR Result:', text.slice(0, 100));

    if (!text || text.trim().length < 3) {
      return res.status(400).json({ msg: 'No readable text found in the image' });
    }

    console.log('[DEBUG] Running AI analysis...');
    const result = await analyzeText(text);
    console.log('[DEBUG] AI Result:', result);

    const pdfFile = await generatePDFReport({
      extractedText: text.trim(),
      verdict: result.verdict,
      explanation: result.explanation,
      confidence: result.confidence,
      sources: result.sources
    });

    return res.json({
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
    console.error('[ERROR] Processing image failed:', error);
    return res.status(500).json({ msg: 'Failed to process the image', error: error.message });
  }
};
