/*
  Warnings:

  - You are about to drop the column `split0` on the `Split` table. All the data in the column will be lost.
  - You are about to drop the column `split1` on the `Split` table. All the data in the column will be lost.
  - You are about to drop the column `split2` on the `Split` table. All the data in the column will be lost.
  - You are about to drop the column `split3` on the `Split` table. All the data in the column will be lost.
  - You are about to drop the column `split4` on the `Split` table. All the data in the column will be lost.
  - You are about to drop the column `split5` on the `Split` table. All the data in the column will be lost.
  - You are about to drop the column `split6` on the `Split` table. All the data in the column will be lost.
  - You are about to drop the column `split7` on the `Split` table. All the data in the column will be lost.
  - You are about to drop the column `split8` on the `Split` table. All the data in the column will be lost.
  - You are about to drop the column `split9` on the `Split` table. All the data in the column will be lost.
  - Added the required column `splitAmount` to the `Split` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Split` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Split_paymentId_key";

-- AlterTable
ALTER TABLE "Split" DROP COLUMN "split0",
DROP COLUMN "split1",
DROP COLUMN "split2",
DROP COLUMN "split3",
DROP COLUMN "split4",
DROP COLUMN "split5",
DROP COLUMN "split6",
DROP COLUMN "split7",
DROP COLUMN "split8",
DROP COLUMN "split9",
ADD COLUMN     "splitAmount" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Split" ADD CONSTRAINT "Split_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
