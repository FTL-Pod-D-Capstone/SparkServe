/*
  Warnings:

  - You are about to drop the column `logo` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Opportunity" ADD COLUMN     "opportunityUrl" TEXT,
ADD COLUMN     "pictureUrl" TEXT,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "dateTime" DROP NOT NULL,
ALTER COLUMN "skillsRequired" DROP NOT NULL,
ALTER COLUMN "spotsAvailable" DROP NOT NULL,
ALTER COLUMN "ageRange" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "logo",
ADD COLUMN     "orgUrl" TEXT,
ADD COLUMN     "pictureUrl" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL,
ALTER COLUMN "contactEmail" DROP NOT NULL;
