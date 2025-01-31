/*
  Warnings:

  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `token_userId_fkey`;

-- DropTable
DROP TABLE `token`;

-- CreateTable
CREATE TABLE `blacklist_token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(225) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `blacklist_token` ADD CONSTRAINT `blacklist_token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
