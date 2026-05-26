import dbConfig from '../config/dbConfig.js';
import generateId from '../utils/idGenerator.js';

const createStory = async (req, res) => {
  try {
    const { title, content, mood, isAnonymous } = req.body;

    const user = await dbConfig.user.findUnique({
      where: {
        email: req.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const story = await dbConfig.story.create({
      data: {
        id: generateId(),
        userId: user.id,
        title,
        content,
        mood,
        isAnonymous: isAnonymous ?? false,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Story created successfully',
      data: {
        ...story,
        user: story.isAnonymous ? null : story.user,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStory = async (req, res) => {
  try {
    const stories = await dbConfig.story.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const mappedStories = stories.map((story) => ({
      ...story,
      user: story.isAnonymous ? null : story.user,
    }));

    res.status(200).json({
      status: 'success',
      data: mappedStories,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStoryByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const stories = await dbConfig.story.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const mappedStories = stories.map((story) => ({
      ...story,
      user: story.isAnonymous ? null : story.user,
    }));

    res.status(200).json({
      status: 'success',
      data: mappedStories,
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const storyId = Number(id);

    if (Number.isNaN(storyId)) {
      return res.status(400).json({
        message: 'Invalid story id',
      });
    }

    const story = await dbConfig.story.findUnique({
      where: {
        id: storyId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!story) {
      return res.status(404).json({
        message: 'Story not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        ...story,
        user: story.isAnonymous ? null : story.user,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const storyId = Number(id);

    if (Number.isNaN(storyId)) {
      return res.status(400).json({
        message: 'Invalid story id',
      });
    }

    const user = await dbConfig.user.findUnique({
      where: {
        email: req.user.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const story = await dbConfig.story.findFirst({
      where: {
        id: storyId,
        userId: user.id,
      },
    });

    if (!story) {
      return res.status(404).json({
        message: 'Story not found or you are not authorized',
      });
    }

    await dbConfig.story.delete({
      where: {
        id: storyId,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Story deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { createStory, getStory, getStoryByUserId, getStoryById, deleteStory };
