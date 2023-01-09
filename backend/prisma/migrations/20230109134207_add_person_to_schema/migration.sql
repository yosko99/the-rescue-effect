/*
  Warnings:

  - Changed the type of `category` on the `Animal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Genders" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "AnimalTypes" AS ENUM ('CAT', 'DOG');

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "adopted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "personId" TEXT,
DROP COLUMN "category",
ADD COLUMN     "category" "AnimalTypes" NOT NULL;

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "Genders" NOT NULL,
    "animalPreferences" "AnimalTypes" NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
