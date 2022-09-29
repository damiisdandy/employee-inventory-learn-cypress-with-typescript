-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('ACCOUNTANT', 'ENGINEER', 'DOCTOR', 'DEVELOPER', 'ARTIST', 'STUDENT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "occupation" "Occupation" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
