/*
  Warnings:

  - You are about to drop the column `date` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Opportunity` table. All the data in the column will be lost.
  - Added the required column `ageRange` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTime` to the `Opportunity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Opportunity" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "ageRange" TEXT NOT NULL,
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;
