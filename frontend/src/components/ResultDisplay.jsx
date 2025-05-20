export default function ResultDisplay({ data }) {
  const { extractedText, verdict, confidence, explanation, sources, pdf } = data;

  const badgeColor =
    verdict === 'Real'
      ? 'bg-green-700 text-white'
      : verdict === 'Fake'
      ? 'bg-red-700 text-white'
      : 'bg-yellow-600 text-white';

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto border border-green-500">
      <h2 className="text-2xl font-bold text-green-500 mb-4">🧾 Extracted Text</h2>
      <p className="italic mb-6 whitespace-pre-wrap text-gray-300">{extractedText}</p>

      <div className="flex items-center mb-6">
        <span className={`px-4 py-1 rounded-full mr-4 text-sm font-semibold ${badgeColor}`}>
          {verdict}
        </span>
        <span className="text-gray-400">
          Confidence: <strong className="text-white">{confidence}%</strong>
        </span>
      </div>

      <h3 className="text-xl text-green-500 mb-2">💬 Explanation</h3>
      <p className="mb-6 text-gray-300">{explanation}</p>

      <h3 className="text-xl text-green-500 mb-2">🔗 Sources</h3>
      <ul className="list-disc list-inside text-gray-300 mb-6">
        {sources.map((src, i) => (
          <li key={i}>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="text-green-400 hover:underline"
            >
              Link
            </a>
          </li>
        ))}
      </ul>

      <a
        href={pdf}
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Download PDF Report
      </a>
    </div>
  );
}
