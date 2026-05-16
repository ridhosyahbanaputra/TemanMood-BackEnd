const dbConfig = require("../config/dbConfig");
const generateId = require("../utils/idGenerator");

const createStory = async (req, res) => {
    try {
        const { title, content, mood, is_anonymous } = req.body;

        const { data: user, error: userError } = await dbConfig
            .from("users")
            .select("id")
            .eq("email", req.user.email)
            .single();

        if (userError || !user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const { data, error } = await dbConfig
            .from("stories")
            .insert([
                {
                    id: generateId(),
                    user_id: user.id,
                    title,
                    content,
                    mood,
                    is_anonymous
                }
            ])
            .select();

        if (error) throw error;

        res.status(201).json({
            message: "Story created successfully",
            data
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getStories = async (req, res) => {
    try {
        const { data, error } = await dbConfig
            .from("stories")
            .select(`
        *,
        users(username)
      `)
            .order("created_at", { ascending: false });

        if (error) throw error;

        res.status(200).json({
            data
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getStoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await dbConfig
            .from("stories")
            .select(`
        *,
        users(username)
      `)
            .eq("id", id)
            .single();

        if (error) throw error;

        res.status(200).json({
            data
        });

    } catch (error) {
        res.status(404).json({
            message: "Stories not found"
        });
    }
};

const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: user, error: userError } = await dbConfig
            .from("users")
            .select("id")
            .eq("email", req.user.email)
            .single();

        if (userError || !user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const { error } = await dbConfig
            .from("stories")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id);

        if (error) throw error;

        res.status(200).json({
            message: "Story deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createStory, getStories, getStoryById, deleteStory };