import { GetComics } from "@wasp/queries/types";
import { Comic } from "@wasp/entities";

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
