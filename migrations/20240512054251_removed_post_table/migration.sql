/*
  Warnings:

  - You are about to drop the column `avatar_extension` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_filesize` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_height` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_width` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_author_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_tags" DROP CONSTRAINT "_Post_tags_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar_extension",
DROP COLUMN "avatar_filesize",
DROP COLUMN "avatar_height",
DROP COLUMN "avatar_id",
DROP COLUMN "avatar_width";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostTag";

-- DropTable
DROP TABLE "_Post_tags";
