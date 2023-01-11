/*
  Warnings:

  - You are about to drop the column `userId` on the `Animal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_userId_fkey";

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
