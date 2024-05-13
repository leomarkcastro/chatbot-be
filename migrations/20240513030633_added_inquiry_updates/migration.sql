/*
  Warnings:

  - You are about to drop the column `fullname` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `policyID` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `policyURL` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `sessionID` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `Inquiry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "fullname",
DROP COLUMN "policyID",
DROP COLUMN "policyURL",
DROP COLUMN "sessionID",
DROP COLUMN "zip",
ADD COLUMN     "age" DOUBLE PRECISION,
ADD COLUMN     "currentLivingSituation" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "diseases" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "medications" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "reasonOfApplication" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "yearlyIncome" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "policyName" TEXT NOT NULL DEFAULT '',
    "policyURL" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);
