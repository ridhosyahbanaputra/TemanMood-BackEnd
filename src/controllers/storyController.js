import dbConfig from "../config/dbConfig.js";
import generateId from "../utils/idGenerator.js";

const createStory = async (req, res) => {
    try {
        const { title, content, mood, is_anonymous } = req.body;

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
                message: "User not found",
            });
        }

        const story = await dbConfig.story.create({
            data: {
                id: generateId(),
                userId: user.id,
                title,
                content,
                mood,
                isAnonymous: is_anonymous ?? false,
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
            message: "Story created successfully",
            data: story,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getStories = async (req, res) => {
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
                createdAt: "desc",
            },
        });

        res.status(200).json({
            data: stories,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getStoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const story = await dbConfig.story.findUnique({
            where: {
                id: Number(id),
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
                message: "Story not found",
            });
        }

        res.status(200).json({
            data: story,
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
                message: "User not found",
            });
        }

        const story = await dbConfig.story.findFirst({
            where: {
                id: Number(id),
                userId: user.id,
            },
        });

        if (!story) {
            return res.status(404).json({
                message: "Story not found or you are not authorized",
            });
        }

        await dbConfig.story.delete({
            where: {
                id: Number(id),
            },
        });

        res.status(200).json({
            message: "Story deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export {
    createStory,
    getStories,
    getStoryById,
    deleteStory,
};