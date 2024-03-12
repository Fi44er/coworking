/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `summaryEvent` on the `orders` table. All the data in the column will be lost.
  - Added the required column `phone-number` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary-event` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "phoneNumber",
DROP COLUMN "summaryEvent",
ADD COLUMN     "phone-number" INTEGER NOT NULL,
ADD COLUMN     "summary-event" TEXT NOT NULL;
