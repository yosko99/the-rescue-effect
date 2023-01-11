/*
  Warnings:

  - You are about to drop the column `personId` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Animal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_personId_fkey";

-- DropIndex
DROP INDEX "Animal_personId_key";

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "personId",
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "Person";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" "Genders" NOT NULL,
    "animalPreferences" "AnimalTypes" NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Animal_userId_key" ON "Animal"("userId");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
