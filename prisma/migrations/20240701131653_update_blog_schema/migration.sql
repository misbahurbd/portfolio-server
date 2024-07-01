/*
  Warnings:

  - A unique constraint covering the columns `[blogId]` on the table `metadata` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_metadataId_fkey";

-- DropIndex
DROP INDEX "blogs_metadataId_key";

-- AlterTable
ALTER TABLE "blogs" ALTER COLUMN "metadataId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "metadata" ADD COLUMN     "blogId" TEXT,
ALTER COLUMN "projectId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "metadata_blogId_key" ON "metadata"("blogId");

-- AddForeignKey
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
