const recentStoryRequests = new Map();

const preventDuplicateStory = (req, res, next) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({
            status: 'failed',
            message: 'Unauthorized',
        });
    }

    const {
        title = '',
        content = '',
        mood = '',
        is_anonymous = false,
    } = req.body;

    const requestKey = JSON.stringify({
        userId,
        title: title.trim(),
        content: content.trim(),
        mood: mood.trim(),
        is_anonymous,
    });

    if (recentStoryRequests.has(requestKey)) {
        return res.status(409).json({
            status: 'failed',
            message: 'Duplicate story request detected. Please wait a moment.',
        });
    }

    recentStoryRequests.set(requestKey, Date.now());

    setTimeout(() => {
        recentStoryRequests.delete(requestKey);
    }, 5000);

    next();
};

export default preventDuplicateStory;
