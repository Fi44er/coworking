-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_application-id_fkey";

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_application-id_fkey" FOREIGN KEY ("application-id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
