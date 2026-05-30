const getWordCount = (text = '') => {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => /[a-zA-Z0-9À-ÿ]/.test(word)).length;
};

const getTodayDateOnly = () => {
  const now = new Date();

  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
};

const calculateMoodScore = (probabilities = {}) => {
  const bad = probabilities.Bad ?? 0;
  const normal = probabilities.Normal ?? 0;
  const good = probabilities.Good ?? 0;

  const score = bad * 20 + normal * 50 + good * 90;

  return Number(score.toFixed(2));
};

export { getWordCount, getTodayDateOnly, calculateMoodScore };
