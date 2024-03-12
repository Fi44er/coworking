/*
  Warnings:

  - You are about to drop the column `duration` on the `orders` table. All the data in the column will be lost.
  - Added the required column `time-end` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "duration",
ADD COLUMN     "time-end" TIMESTAMP(3) NOT NULL;
