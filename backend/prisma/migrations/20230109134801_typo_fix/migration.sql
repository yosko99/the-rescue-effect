/*
  Warnings:

  - You are about to drop the column `adopted` on the `Animal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "adopted",
ADD COLUMN     "isAdopted" BOOLEAN NOT NULL DEFAULT false;
