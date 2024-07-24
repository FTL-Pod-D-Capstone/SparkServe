/*
  Warnings:

  - You are about to drop the column `message` on the `ChatBotInteraction` table. All the data in the column will be lost.
  - Added the required column `conversationId` to the `ChatBotInteraction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `ChatBotInteraction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatBotInteraction" DROP COLUMN "message",
ADD COLUMN     "conversationId" TEXT NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL;
