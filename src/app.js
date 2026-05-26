import express from 'express';
import cors from 'cors';

import dbConfig from './config/dbConfig.js';

import errorMiddleware from './middlewares/errorMiddleware.js';

import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import storyRoute from './routes/storyRoute.js';
import storyBookmarkRoute from './routes/storyBookmarkRoute.js'

const app = express();

app.use(cors());
app.use(express.json());

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
app.use('/story-bookmarks', storyBookmarkRoute)

app.use(errorMiddleware);

export default app;
