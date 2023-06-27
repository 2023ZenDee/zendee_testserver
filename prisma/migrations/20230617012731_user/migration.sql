-- CreateTable
CREATE TABLE `User` (
    `userIdx` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `nick` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `email_check` BOOLEAN NOT NULL DEFAULT false,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_userId_key`(`userId`),
    UNIQUE INDEX `User_nick_key`(`nick`),
    PRIMARY KEY (`userIdx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `postIdx` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(4000) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `authorIdx` INTEGER NOT NULL,
    `postImg` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`postIdx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `cmtIdx` INTEGER NOT NULL AUTO_INCREMENT,
    `cmtContent` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,
    `authorIdx` INTEGER NOT NULL,
    `posterIdx` INTEGER NOT NULL,

    PRIMARY KEY (`cmtIdx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `tagIdx` INTEGER NOT NULL AUTO_INCREMENT,
    `tagName` VARCHAR(191) NOT NULL,
    `posterIdx` INTEGER NOT NULL,

    PRIMARY KEY (`tagIdx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostReporter` (
    `postReporterIdx` INTEGER NOT NULL AUTO_INCREMENT,
    `portReporterContent` VARCHAR(191) NOT NULL,
    `postReported_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `posterIdx` INTEGER NOT NULL,
    `authorIdx` INTEGER NOT NULL,

    PRIMARY KEY (`postReporterIdx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentReporter` (
    `cmtReporterIdx` INTEGER NOT NULL AUTO_INCREMENT,
    `cmtReportContent` VARCHAR(191) NOT NULL,
    `cmtReported_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `posterIdx` INTEGER NOT NULL,
    `authorIdx` INTEGER NOT NULL,

    PRIMARY KEY (`cmtReporterIdx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Likes` (
    `likeIdx` INTEGER NOT NULL AUTO_INCREMENT,
    `likesBad` BOOLEAN NOT NULL,
    `posterIdx` INTEGER NOT NULL,
    `authorIdx` INTEGER NOT NULL,

    PRIMARY KEY (`likeIdx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorIdx_fkey` FOREIGN KEY (`authorIdx`) REFERENCES `User`(`userIdx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_authorIdx_fkey` FOREIGN KEY (`authorIdx`) REFERENCES `User`(`userIdx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_posterIdx_fkey` FOREIGN KEY (`posterIdx`) REFERENCES `Post`(`postIdx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_posterIdx_fkey` FOREIGN KEY (`posterIdx`) REFERENCES `Post`(`postIdx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostReporter` ADD CONSTRAINT `PostReporter_posterIdx_fkey` FOREIGN KEY (`posterIdx`) REFERENCES `Post`(`postIdx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostReporter` ADD CONSTRAINT `PostReporter_authorIdx_fkey` FOREIGN KEY (`authorIdx`) REFERENCES `User`(`userIdx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentReporter` ADD CONSTRAINT `CommentReporter_posterIdx_fkey` FOREIGN KEY (`posterIdx`) REFERENCES `Post`(`postIdx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentReporter` ADD CONSTRAINT `CommentReporter_authorIdx_fkey` FOREIGN KEY (`authorIdx`) REFERENCES `User`(`userIdx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_posterIdx_fkey` FOREIGN KEY (`posterIdx`) REFERENCES `Post`(`postIdx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_authorIdx_fkey` FOREIGN KEY (`authorIdx`) REFERENCES `User`(`userIdx`) ON DELETE RESTRICT ON UPDATE CASCADE;
