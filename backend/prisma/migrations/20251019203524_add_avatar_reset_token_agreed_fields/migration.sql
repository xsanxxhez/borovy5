/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiry` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `socialLinks` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,jobId]` on the table `applications` will be added. If there are existing duplicate values, this will fail.
  - Made the column `contactInfo` on table `enterprises` required. This step will fail if there are existing NULL values in that column.
  - Made the column `requirements` on table `jobs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_enterpriseId_fkey";

-- DropForeignKey
ALTER TABLE "promo_codes" DROP CONSTRAINT "promo_codes_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "promo_registrations" DROP CONSTRAINT "promo_registrations_promoCodeId_fkey";

-- DropIndex
DROP INDEX "applications_jobId_userId_key";

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "enterprises" ALTER COLUMN "contactInfo" SET NOT NULL;

-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "requirements" SET NOT NULL;

-- AlterTable
ALTER TABLE "promo_codes" ADD COLUMN     "usedCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "resetTokenExpiry",
DROP COLUMN "socialLinks",
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'WORKER';

-- CreateIndex
CREATE INDEX "applications_userId_idx" ON "applications"("userId");

-- CreateIndex
CREATE INDEX "applications_jobId_idx" ON "applications"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "applications_userId_jobId_key" ON "applications"("userId", "jobId");

-- AddForeignKey
ALTER TABLE "promo_codes" ADD CONSTRAINT "promo_codes_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promo_registrations" ADD CONSTRAINT "promo_registrations_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "promo_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "enterprises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
