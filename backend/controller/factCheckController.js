const fs = require('fs');
const tesseract = require('tesseract.js');
const { analyzeText } = require('../utils/openaiCheck');
const { generatePDFReport } = require('../utils/generatePDF');

exports.uploadAndCheck = async (req, res) => {
  const imagePath = req.file.path;

  try {
    // 1. Handle Free Trials for Guest Users
    if (!req.user) {
      // Initialize session counter if not present
      if (!req.session.trialCount) req.session.trialCount = 0;

      if (req.session.trialCount >= 5) {
        return res.status(403).json({ msg: 'Free trial limit exceeded. Please login to continue.' });
      }

      req.session.trialCount += 1;
    }

    // 2. OCR Extraction
    const { data: { text } } = await tesseract.recognize(imagePath, 'eng');

    // 3. AI Analysis
    const result = await analyzeText(text);

    // 4. PDF Generation
    const pdfFile = await generatePDFReport({
      extractedText: text.trim(),
      verdict: result.verdict,
      explanation: result.explanation,
      confidence: result.confidence,
      sources: result.sources
    });

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
    console.error(error);
    res.status(500).json({ msg: 'Failed to process the image' });
  }
};
