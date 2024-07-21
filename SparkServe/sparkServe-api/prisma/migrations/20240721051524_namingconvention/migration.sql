/*
  Warnings:

  - You are about to drop the `chatBotInteraction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `opportunity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `registration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chatBotInteraction" DROP CONSTRAINT "chatBotInteraction_userId_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_opportunityId_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "opportunity" DROP CONSTRAINT "opportunity_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "registration" DROP CONSTRAINT "registration_opportunityId_fkey";

-- DropForeignKey
ALTER TABLE "registration" DROP CONSTRAINT "registration_userId_fkey";

-- DropTable
DROP TABLE "chatBotInteraction";

-- DropTable
DROP TABLE "feedback";

-- DropTable
DROP TABLE "notification";

-- DropTable
DROP TABLE "opportunity";

-- DropTable
DROP TABLE "organization";

-- DropTable
DROP TABLE "registration";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "profilePicture" TEXT,
    "bio" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Organization" (
    "organizationId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("organizationId")
);

-- CreateTable
CREATE TABLE "Opportunity" (
    "opportunityId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "skillsRequired" TEXT NOT NULL,
    "spotsAvailable" INTEGER NOT NULL,
    "ageRange" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("opportunityId")
);

-- CreateTable
CREATE TABLE "ChatBotInteraction" (
    "interactionId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatBotInteraction_pkey" PRIMARY KEY ("interactionId")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "feedbackId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "opportunityId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedbackId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notificationId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "readStatus" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationId")
);

-- CreateTable
CREATE TABLE "Registration" (
    "registrationId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "opportunityId" INTEGER NOT NULL,
    "registrationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("registrationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "Organization"("email");

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBotInteraction" ADD CONSTRAINT "ChatBotInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("opportunityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("opportunityId") ON DELETE CASCADE ON UPDATE CASCADE;
