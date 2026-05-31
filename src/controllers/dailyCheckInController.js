import dbConfig from '../config/dbConfig.js';
import { predictMood } from '../services/aiService.js';
import {
  calculateMoodScore,
  getTodayDateOnly,
  getWordCount,
} from '../utils/dailyCheckInUtils.js';

const getInsightResponseStatus = (dailyCheckIn) => {
  const insightRequested = dailyCheckIn.aiMetadata?.insightRequested || false;

  if (insightRequested && dailyCheckIn.insight) {
    return {
      insightStatus: 'available',
      insightMessage: null,
    };
  }

  if (insightRequested && !dailyCheckIn.insight) {
    return {
      insightStatus: 'unavailable',
      insightMessage: 'AI insight is currently unavailable',
    };
  }

  return {
    insightStatus: 'not_requested',
    insightMessage: null,
  };
};

const mapDailyCheckInResponse = (dailyCheckIn) => {
  const { insightStatus, insightMessage } =
    getInsightResponseStatus(dailyCheckIn);

  return {
    id: dailyCheckIn.id,
    userId: dailyCheckIn.userId,
    checkInDate: dailyCheckIn.checkInDate,
    weekday: dailyCheckIn.weekday,
    time: dailyCheckIn.time,
    subMood: dailyCheckIn.subMood,
    activities: dailyCheckIn.activities,
    journal: dailyCheckIn.journal,
    analysis: {
      predictedMood: dailyCheckIn.predictedMood,
      rawMood: dailyCheckIn.rawMood,
      confidence: dailyCheckIn.confidence,
      probabilities: dailyCheckIn.probabilities,
      moodScore: dailyCheckIn.moodScore,
    },
    recommendations: dailyCheckIn.recommendations,
    insight: dailyCheckIn.insight,
    insightStatus,
    insightMessage,
    createdAt: dailyCheckIn.createdAt,
    updatedAt: dailyCheckIn.updatedAt,
  };
};

const createDailyCheckIn = async (req, res) => {
  try {
    const {
      weekday,
      time,
      sub_mood,
      activities,
      journal,
      use_insight,
      timezone,
    } = req.body;

    const checkInDate = getTodayDateOnly(timezone);

    const existingDailyCheckIn = await dbConfig.dailyCheckIn.findUnique({
      where: {
        userId_checkInDate: {
          userId: req.user.id,
          checkInDate,
        },
      },
    });

    if (existingDailyCheckIn) {
      return res.status(409).json({
        status: 'failed',
        message: 'You have already checked in today',
      });
    }

    const journalWordCount = getWordCount(journal || '');
    const shouldUseInsight = Boolean(use_insight) && journalWordCount >= 5;

    const aiPayload = {
      weekday,
      time,
      sub_mood,
      activities: activities.join(' | '),
      journal: journal || '',
      use_insight: shouldUseInsight,
    };

    const aiResponse = await predictMood(aiPayload);
    const aiData = aiResponse.data;

    if (
      !aiData?.analysis?.mood ||
      !aiData?.analysis?.rawMood ||
      typeof aiData?.analysis?.confidence !== 'number'
    ) {
      return res.status(502).json({
        status: 'failed',
        message: 'Invalid AI prediction response',
      });
    }

    const probabilities = aiData.analysis.probabilities || null;
    const moodScore = calculateMoodScore(probabilities || {});

    const dailyCheckIn = await dbConfig.dailyCheckIn.create({
      data: {
        userId: req.user.id,
        checkInDate,
        weekday,
        time,
        subMood: sub_mood,
        activities,
        journal: journal || null,
        predictedMood: aiData.analysis.mood,
        rawMood: aiData.analysis.rawMood,
        confidence: aiData.analysis.confidence,
        probabilities,
        recommendations: aiData.recommendation?.activities || null,
        insight: aiData.insight || null,
        moodScore,
        aiMetadata: {
          rawProbabilities: aiData.analysis.rawProbabilities || null,
          topPredictions: aiData.analysis.topPredictions || null,
          insightRequested: shouldUseInsight,
          journalWordCount,
          timezone,
        },
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Daily check-in created successfully',
      data: mapDailyCheckInResponse(dailyCheckIn),
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const getDailyCheckIns = async (req, res) => {
  try {
    const dailyCheckIns = await dbConfig.dailyCheckIn.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const mappedDailyCheckIns = dailyCheckIns.map((dailyCheckIn) =>
      mapDailyCheckInResponse(dailyCheckIn)
    );

    res.status(200).json({
      status: 'success',
      data: mappedDailyCheckIns,
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const getTodayDailyCheckIn = async (req, res) => {
  try {
    const { timezone } = req.query;

    const checkInDate = getTodayDateOnly(timezone);

    const dailyCheckIn = await dbConfig.dailyCheckIn.findUnique({
      where: {
        userId_checkInDate: {
          userId: req.user.id,
          checkInDate,
        },
      },
    });

    if (!dailyCheckIn) {
      return res.status(200).json({
        status: 'success',
        data: null,
      });
    }

    res.status(200).json({
      status: 'success',
      data: mapDailyCheckInResponse(dailyCheckIn),
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const getDailyCheckInById = async (req, res) => {
  try {
    const { id } = req.params;
    const dailyCheckInId = Number(id);

    if (Number.isNaN(dailyCheckInId)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid daily check-in id',
      });
    }

    const dailyCheckIn = await dbConfig.dailyCheckIn.findFirst({
      where: {
        id: dailyCheckInId,
        userId: req.user.id,
      },
    });

    if (!dailyCheckIn) {
      return res.status(404).json({
        status: 'failed',
        message: 'Daily check-in not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: mapDailyCheckInResponse(dailyCheckIn),
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

export {
  createDailyCheckIn,
  getDailyCheckIns,
  getTodayDailyCheckIn,
  getDailyCheckInById,
};
