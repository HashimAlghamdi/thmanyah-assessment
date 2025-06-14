/*
  Warnings:

  - You are about to drop the column `artist` on the `Podcast` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Podcast` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itunesId]` on the table `Podcast` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artistName` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itunesId` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Podcast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Podcast" DROP COLUMN "artist",
DROP COLUMN "title",
ADD COLUMN     "artistName" TEXT NOT NULL,
ADD COLUMN     "artworkUrl600" TEXT,
ADD COLUMN     "itunesId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "feedUrl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_itunesId_key" ON "Podcast"("itunesId");
