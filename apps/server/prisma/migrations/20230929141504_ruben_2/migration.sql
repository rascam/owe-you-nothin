/*
  Warnings:

  - You are about to drop the column `groupId` on the `Split` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Split" DROP CONSTRAINT "Split_groupId_fkey";

-- AlterTable
ALTER TABLE "Split" DROP COLUMN "groupId";
