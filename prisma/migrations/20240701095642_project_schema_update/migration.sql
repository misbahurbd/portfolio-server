-- DropForeignKey
ALTER TABLE "SourceLinks" DROP CONSTRAINT "SourceLinks_projectId_fkey";

-- DropForeignKey
ALTER TABLE "metadata" DROP CONSTRAINT "metadata_projectId_fkey";

-- AddForeignKey
ALTER TABLE "SourceLinks" ADD CONSTRAINT "SourceLinks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
