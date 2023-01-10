/*
  Warnings:

  - A unique constraint covering the columns `[personId]` on the table `Animal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_personId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Animal_personId_key" ON "Animal"("personId");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
