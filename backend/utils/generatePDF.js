const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');

exports.generatePDFReport = async ({ extractedText, verdict, explanation, confidence, sources }) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 750;
  const leftMargin = 50;
  const fontSize = 12;
  const lineHeight = 18;

  const drawTextLine = (text, offset = 0, size = fontSize, bold = false) => {
    if (!text) return;
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      page.drawText(line, {
        x: leftMargin,
        y: y - (i + offset) * lineHeight,
        size,
        font,
        color: rgb(0, 0, 0)
      });
    });
    y -= lines.length * lineHeight;
  };

  const drawSection = (title, content) => {
    drawTextLine(`${title}:`, 1, fontSize + 1);
    y -= 5;
    drawTextLine(content);
    y -= 10;
  };

  // Header
  page.drawText('Fake News Report', {
    x: leftMargin,
    y,
    size: 18,
    font,
    color: rgb(0.1, 0.1, 0.1)
  });
  y -= 40;

  drawTextLine(`Date: ${new Date().toLocaleDateString()}`);
  drawSection('Extracted Text', extractedText);
  drawSection('Verdict', verdict);
  drawSection('Confidence', `${confidence}%`);
  drawSection('Explanation', explanation);
  drawTextLine('Sources:', 1);
  sources.forEach(src => drawTextLine(src));

  const pdfBytes = await pdfDoc.save();
  const filename = `report_${Date.now()}.pdf`;
  const filePath = `uploads/${filename}`;
  fs.writeFileSync(filePath, pdfBytes);
  return filename;
};
