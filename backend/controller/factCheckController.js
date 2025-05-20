const fs = require('fs');
const tesseract = require('tesseract.js');
const { analyzeText } = require('../utils/openaiCheck');
const { generatePDFReport } = require('../utils/generatePDF');

exports.uploadAndCheck = async (req, res) => {
  const imagePath = req.file.path;

  try {
    const { data: { text } } = await tesseract.recognize(imagePath, 'eng');
    const result = await analyzeText(text);

    const pdfFile = await generatePDFReport({
      extractedText: text.trim(),
      verdict: result.verdict,
      explanation: result.explanation,
      confidence: result.confidence,
      sources: result.sources
    });

    res.json({
      extractedText: text.trim(),
      verdict: result.verdict,
      confidence: result.confidence,
      explanation: result.explanation,
      sources: result.sources,
      pdf: `/uploads/${pdfFile}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to process the image' });
  }
};
