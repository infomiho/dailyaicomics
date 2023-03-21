/*
  Warnings:

  - Added the required column `status` to the `ComicJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComicJob" ADD COLUMN     "status" TEXT NOT NULL;
