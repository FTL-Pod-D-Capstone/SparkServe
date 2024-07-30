-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Bookmark" (
    "bookmarkId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "opportunityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("bookmarkId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_opportunityId_key" ON "Bookmark"("userId", "opportunityId");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("opportunityId") ON DELETE CASCADE ON UPDATE CASCADE;
