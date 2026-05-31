const allowedTimezones = ['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura'];

const getValidTimezone = (timezone) => {
  if (allowedTimezones.includes(timezone)) {
    return timezone;
  }

  return 'Asia/Jakarta';
};

const getWordCount = (text = '') => {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => /[a-zA-Z0-9À-ÿ]/.test(word)).length;
};

const getTodayDateOnly = (timezone = 'Asia/Jakarta') => {
  const validTimezone = getValidTimezone(timezone);
  const now = new Date();

  const localDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: validTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);

  return new Date(`${localDate}T00:00:00.000Z`);
};

const calculateMoodScore = (probabilities = {}) => {
  const bad = Number(probabilities.Bad ?? 0);
  const normal = Number(probabilities.Normal ?? 0);
  const good = Number(probabilities.Good ?? 0);

  const score = bad * 20 + normal * 50 + good * 90;

  if (Number.isNaN(score)) {
    return 50;
  }

  return Math.min(100, Math.max(0, Number(score.toFixed(2))));
};

export { getWordCount, getTodayDateOnly, calculateMoodScore, getValidTimezone };
