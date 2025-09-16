/*
  Warnings:

  - Added the required column `orderDate` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `orderDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `imageUrl` VARCHAR(191) NULL;
