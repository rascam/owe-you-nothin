-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "size" INTEGER;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "payingUser" INTEGER;

-- AlterTable
ALTER TABLE "Split" ALTER COLUMN "split0" SET DEFAULT 0,
ALTER COLUMN "split1" SET DEFAULT 0,
ALTER COLUMN "split2" SET DEFAULT 0,
ALTER COLUMN "split3" SET DEFAULT 0,
ALTER COLUMN "split4" SET DEFAULT 0,
ALTER COLUMN "split5" SET DEFAULT 0,
ALTER COLUMN "split6" SET DEFAULT 0,
ALTER COLUMN "split7" SET DEFAULT 0,
ALTER COLUMN "split8" SET DEFAULT 0,
ALTER COLUMN "split9" SET DEFAULT 0;
