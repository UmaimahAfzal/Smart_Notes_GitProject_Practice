// backend/summarizer.js

/**
 * Basic extractive summarization.
 * Selects important sentences from the original note.
 *
 * @param {string} content - The original note content.
 * @returns {string} A short summary of the note.
 */
function summarizeNote(content) {
  // Handle missing or invalid input.
  if (typeof content !== "string" || !content.trim()) {
    return "Please provide some note content to summarize.";
  }

  const text = content.trim();

  // Split the note into sentences.
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g);

  if (!sentences || sentences.length === 0) {
    return text;
  }

  const cleanedSentences = sentences
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  // Keep very short notes unchanged.
  if (cleanedSentences.length <= 2) {
    return cleanedSentences.join(" ");
  }

  // Common words that usually carry little meaning by themselves.
  const stopWords = new Set([
    "a", "an", "the", "is", "are", "was", "were",
    "be", "been", "being", "to", "of", "in", "on",
    "at", "for", "and", "or", "but", "with", "by",
    "as", "it", "its", "this", "that", "these",
    "those", "from", "has", "have", "had", "do",
    "does", "did", "will", "would", "can", "could",
    "should", "may", "might", "we", "they", "he",
    "she", "you", "i", "their", "our", "your"
  ]);

  // Calculate word frequencies across the entire note.
  const wordFrequencies = {};

  for (const sentence of cleanedSentences) {
    const words = sentence.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];

    for (const word of words) {
      if (!stopWords.has(word)) {
        wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
      }
    }
  }

  // Score sentences according to the importance of their words.
  const scoredSentences = cleanedSentences.map((sentence, index) => {
    const words = sentence.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];

    let score = 0;

    for (const word of words) {
      if (!stopWords.has(word)) {
        score += wordFrequencies[word] || 0;
      }
    }

    // Normalize the score so longer sentences aren't automatically favored.
    const meaningfulWordCount = words.filter(
      (word) => !stopWords.has(word)
    ).length;

    score = meaningfulWordCount > 0
      ? score / meaningfulWordCount
      : 0;

    // Slightly favor the opening sentence.
    if (index === 0) {
      score += 0.5;
    }

    return { sentence, index, score };
  });

  // Select approximately one-third of the sentences.
  const summaryCount = Math.max(
    1,
    Math.ceil(cleanedSentences.length / 3)
  );

  const selectedSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, summaryCount)
    .sort((a, b) => a.index - b.index);

  // Return the selected sentences in their original order.
  return selectedSentences
    .map((item) => item.sentence)
    .join(" ");
}

// Export the function for the backend to import.
module.exports = summarizeNote;