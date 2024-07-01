/*
  Warnings:

  - You are about to drop the column `metadataId` on the `projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `metadata` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `metadata` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_metadataId_fkey";

-- DropIndex
DROP INDEX "projects_metadataId_key";

-- AlterTable
ALTER TABLE "metadata" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "metadataId";

-- CreateTable
CREATE TABLE "SourceLinks" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "SourceLinks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "metadata_projectId_key" ON "metadata"("projectId");

-- AddForeignKey
ALTER TABLE "SourceLinks" ADD CONSTRAINT "SourceLinks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
