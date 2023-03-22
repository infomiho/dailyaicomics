import { GetComics, GetComic } from "@wasp/queries/types";
import { Comic } from "@wasp/entities";
import HttpError from "@wasp/core/HttpError.js";

export const getComics: GetComics<{}, Comic[]> = async (args, context) => {
  const comics = await context.entities.Comic.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
    include: {
      images: true,
      _count: {
        select: { votes: true },
      },
    },
  });
  comics.sort((a, b) => b._count.votes - a._count.votes);
  return comics;
};

export const getComic: GetComic<{ comicId: string }, Comic> = async (
  args,
  context
) => {
  const comic = await context.entities.Comic.findUnique({
    where: {
      id: args.comicId,
    },
    include: {
      images: true,
      _count: {
        select: { votes: true },
      },
    },
  });
  if (!comic) {
    throw new HttpError(404, "Comic not found.");
  }
  return comic;
};
