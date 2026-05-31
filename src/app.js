import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import dbConfig from './config/dbConfig.js';

import errorMiddleware from './middlewares/errorMiddleware.js';

import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import storyRoute from './routes/storyRoute.js';
import storyBookmarkRoute from './routes/storyBookmarkRoute.js';
import notesRoute from './routes/notesRoute.js';
import dailyCheckInRoute from './routes/dailyCheckInRoute.js';

const app = express();

const allowedOrigins = ['http://localhost:5173','http://localhost:4173', 'http://localhost:3000'];

app.use(helmet());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '1mb' }));

app.get('/health', async (req, res) => {
  try {
    await dbConfig.user.findFirst({
      select: {
        id: true,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'TemanMood API is running',
      database: 'connected',
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      database: 'disconnected',
      error: error.message,
    });
  }
});

app.use(authRoute);

app.use('/users', userRoute);

app.use('/story', storyRoute);

app.use('/story-bookmarks', storyBookmarkRoute);

app.use('/notes', notesRoute);

app.use('/daily-check-ins', dailyCheckInRoute);

app.use((req, res) => {
  res.status(404).json({
    status: 'failed',
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use(errorMiddleware);

export default app;
