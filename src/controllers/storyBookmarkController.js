import dbConfig from '../config/dbConfig.js';

const addStoryBookmark = async (req, res) => {
    try {
        const { storyId } = req.params;
        const parsedStoryId = Number(storyId);

        if (Number.isNaN(parsedStoryId)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid story id',
            });
        }

        const story = await dbConfig.story.findUnique({
            where: {
                id: parsedStoryId,
            },
            select: {
                id: true,
            },
        });

        if (!story) {
            return res.status(404).json({
                status: 'failed',
                message: 'Story not found',
            });
        }

        const bookmark = await dbConfig.storyBookmark.upsert({
            where: {
                userId_storyId: {
                    userId: req.user.id,
                    storyId: parsedStoryId,
                },
            },
            update: {},
            create: {
                userId: req.user.id,
                storyId: parsedStoryId,
            },
        });

        res.status(201).json({
            status: 'success',
            message: 'Story bookmarked successfully',
            data: bookmark,
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};

const removeStoryBookmark = async (req, res) => {
    try {
        const { storyId } = req.params;
        const parsedStoryId = Number(storyId);

        if (Number.isNaN(parsedStoryId)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid story id',
            });
        }

        const deletedBookmark = await dbConfig.storyBookmark.deleteMany({
            where: {
                userId: req.user.id,
                storyId: parsedStoryId,
            },
        });

        if (deletedBookmark.count === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'Story bookmark not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Story bookmark removed successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};

const getStoryBookmarks = async (req, res) => {
    try {
        const bookmarks = await dbConfig.storyBookmark.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                story: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const stories = bookmarks.map((bookmark) => ({
            ...bookmark.story,
            user: bookmark.story.isAnonymous ? null : bookmark.story.user,
            bookmarkedAt: bookmark.createdAt,
        }));

        res.status(200).json({
            status: 'success',
            data: stories,
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};

export { addStoryBookmark, removeStoryBookmark, getStoryBookmarks };
