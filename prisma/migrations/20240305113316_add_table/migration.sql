/*
  Warnings:

  - Added the required column `application-id` to the `pictures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pictures" ADD COLUMN     "application-id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_application-id_fkey" FOREIGN KEY ("application-id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
