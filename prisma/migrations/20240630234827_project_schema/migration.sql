/*
  Warnings:

  - You are about to drop the column `publishedAt` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "publishedAt",
DROP COLUMN "status";
