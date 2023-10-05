/*
  Warnings:

  - You are about to drop the column `payingUser` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `pos` on the `User` table. All the data in the column will be lost.
  - Added the required column `payingUserId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "payingUser",
ADD COLUMN     "payingUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pos";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payingUserId_fkey" FOREIGN KEY ("payingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
