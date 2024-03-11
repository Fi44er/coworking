/*
  Warnings:

  - You are about to drop the `applications` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ACCEPTED', 'PENDING', 'REJECTED');

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_room-id_fkey";

-- DropTable
DROP TABLE "applications";

-- DropEnum
DROP TYPE "ApplicationStatus";

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "fio" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "room-id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time-start" TIMESTAMP(3) NOT NULL,
    "time-end" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus"[] DEFAULT ARRAY['PENDING']::"OrderStatus"[],

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_room-id_fkey" FOREIGN KEY ("room-id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
