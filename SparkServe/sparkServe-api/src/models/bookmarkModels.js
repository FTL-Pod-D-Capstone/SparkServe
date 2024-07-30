const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addBookmark = async (userId, opportunityId) => {
    return prisma.bookmark.create({
        data: {
            userId: parseInt(userId),
            opportunityId: parseInt(opportunityId)
        },
        include: {
            opportunity: true
        }
    });
};

const removeBookmark = async (userId, opportunityId) => {
    return prisma.bookmark.deleteMany({
        where: {
            userId: parseInt(userId),
            opportunityId: parseInt(opportunityId)
        }
    });
};

const getBookmarksByUserId = async (userId) => {
    return prisma.bookmark.findMany({
        where: {
            userId: parseInt(userId)
        },
        include: {
            opportunity: true
        }
    });
};

module.exports = {
    addBookmark,
    removeBookmark,
    getBookmarksByUserId
};