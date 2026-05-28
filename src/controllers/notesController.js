import dbConfig from '../config/dbConfig.js';

const createNotes = async (req, res) => {
    try {
        const { title, content, color, isPinned } = req.body;

        const notes = await dbConfig.note.create({
            data: {
                userId: req.user.id,
                title,
                content,
                color,
                isPinned: isPinned ?? false,
            },
        });

        res.status(201).json({
            status: 'success',
            message: 'Notes created successfully',
            data: notes,
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await dbConfig.note.findMany({
            where: {
                userId: req.user.id,
            },
            orderBy: [
                {
                    isPinned: 'desc',
                },
                {
                    updatedAt: 'desc',
                },
            ],
        });

        res.status(200).json({
            status: 'success',
            data: notes,
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};

const updateNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const notesId = Number(id);

        if (Number.isNaN(notesId)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid notes id',
            });
        }

        const notes = await dbConfig.note.findFirst({
            where: {
                id: notesId,
                userId: req.user.id,
            },
        });

        if (!notes) {
            return res.status(404).json({
                status: 'failed',
                message: 'Notes not found',
            });
        }

        const updatedNotes = await dbConfig.note.update({
            where: {
                id: notesId,
            },
            data: req.body,
        });

        res.status(200).json({
            status: 'success',
            message: 'Notes updated successfully',
            data: updatedNotes,
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};

const deleteNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const notesId = Number(id);

        if (Number.isNaN(notesId)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid notes id',
            });
        }

        const notes = await dbConfig.note.findFirst({
            where: {
                id: notesId,
                userId: req.user.id,
            },
        });

        if (!notes) {
            return res.status(404).json({
                status: 'failed',
                message: 'Notes not found',
            });
        }

        await dbConfig.note.delete({
            where: {
                id: notesId,
            },
        });

        res.status(200).json({
            status: 'success',
            message: 'Notes deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
};

export { createNotes, getNotes, updateNotes, deleteNotes };
