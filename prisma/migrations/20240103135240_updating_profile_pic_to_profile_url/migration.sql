/*
  Warnings:

  - You are about to drop the column `profilePic` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "profilePic",
ADD COLUMN     "pictureUrl" TEXT;
