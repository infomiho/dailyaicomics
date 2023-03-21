import { GetComics } from "@wasp/queries/types";
import { Comic } from "@wasp/entities";

export const getComics: GetComics<{}, Comic[]> = async (args, context) => {
  return context.entities.Comic.findMany({
    include: {
      images: true,
    },
  });
};
