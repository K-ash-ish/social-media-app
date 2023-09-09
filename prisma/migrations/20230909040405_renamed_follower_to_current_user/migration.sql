/*
  Warnings:

  - You are about to drop the column `followerId` on the `Follow` table. All the data in the column will be lost.
  - Added the required column `currentUserId` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followerId_fkey";

-- AlterTable
ALTER TABLE "Follow" DROP COLUMN "followerId",
ADD COLUMN     "currentUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_currentUserId_fkey" FOREIGN KEY ("currentUserId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
