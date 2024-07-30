const express = require('express');
const router = express.Router();
const { addBookmarkController, removeBookmarkController, getBookmarksController } = require('../controllers/bookmarkControllers');

router.post('/users/:userId/bookmarks', addBookmarkController);
router.delete('/users/:userId/bookmarks/:opportunityId', removeBookmarkController);
router.get('/users/:userId/bookmarks', getBookmarksController);

module.exports = router;
