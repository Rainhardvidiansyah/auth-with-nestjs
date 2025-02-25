-- CreateTable
CREATE TABLE `token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(225) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
