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

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatBotInteraction" ADD CONSTRAINT "chatBotInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunity"("opportunityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunity"("opportunityId") ON DELETE CASCADE ON UPDATE CASCADE;
