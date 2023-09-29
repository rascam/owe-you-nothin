-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'USD');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('payment', 'transaction');

-- CreateTable
CREATE TABLE "Group" (
    "groupId" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,
    "groupEmail" TEXT,
    "payments" INTEGER[],

    CONSTRAINT "Group_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" SERIAL NOT NULL,
    "type" "Type" NOT NULL,
    "purpose" TEXT,
    "currency" "Currency" NOT NULL DEFAULT 'EUR',

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);
