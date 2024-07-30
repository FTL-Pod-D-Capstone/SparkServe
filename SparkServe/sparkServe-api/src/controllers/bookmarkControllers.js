const bookmarkModels = require("../models/bookmarkModels");

const addBookmarkController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { opportunityId } = req.body;
        const bookmark = await bookmarkModels.addBookmark(userId, opportunityId);
        res.status(201).json(bookmark);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeBookmarkController = async (req, res) => {
    try {
        const { userId, opportunityId } = req.params;
        await bookmarkModels.removeBookmark(userId, opportunityId);
        res.status(204).send('Bookmark Successfully Removed');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookmarksController = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookmarks = await bookmarkModels.getBookmarksByUserId(userId);
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addBookmarkController,
    removeBookmarkController,
    getBookmarksController
};
