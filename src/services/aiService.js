const predictMood = async (payload) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (process.env.HF_SPACE_TOKEN) {
      headers.Authorization = `Bearer ${process.env.HF_SPACE_TOKEN}`;
    }

    const response = await fetch(
      `${process.env.AI_SERVICE_URL}/api/v1/mood/predict`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(
        data.detail || data.message || 'Failed to predict mood'
      );
      error.statusCode = 502;
      error.aiStatus = response.status;
      error.aiResponse = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      const timeoutError = new Error('AI service request timeout');
      timeoutError.statusCode = 504;
      throw timeoutError;
    }

    if (error.statusCode) {
      throw error;
    }

    const serviceError = new Error('AI service is currently unavailable');
    serviceError.statusCode = 503;
    throw serviceError;
  } finally {
    clearTimeout(timeout);
  }
};

export { predictMood };
