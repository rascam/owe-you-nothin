/*
  Warnings:

  - You are about to drop the column `splitId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentId]` on the table `Split` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `Split` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_splitId_fkey";

-- DropIndex
DROP INDEX "Payment_splitId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "splitId";

-- AlterTable
ALTER TABLE "Split" ADD COLUMN     "paymentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Split_paymentId_key" ON "Split"("paymentId");

-- AddForeignKey
ALTER TABLE "Split" ADD CONSTRAINT "Split_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
