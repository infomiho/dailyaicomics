-- AlterTable
ALTER TABLE "ComicJob" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Comic" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "imagePrefix" TEXT NOT NULL,
    "comicJobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComicImage" (
    "id" TEXT NOT NULL,
    "comicId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "imageIndex" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "imagePrompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComicImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_comicJobId_fkey" FOREIGN KEY ("comicJobId") REFERENCES "ComicJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComicImage" ADD CONSTRAINT "ComicImage_comicId_fkey" FOREIGN KEY ("comicId") REFERENCES "Comic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
