import HttpError from "@wasp/core/HttpError.js";

import { VoteForComic } from "@wasp/actions/types";
import { GetTodaysUserVote } from "@wasp/queries/types";

export const vote: VoteForComic<
  { comicId: string },
  { numberOfVotes: number }
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  if (!args.comicId) {
    throw new HttpError(400, "Comic id is required.");
  }

  const existingVote = await context.entities.Vote.findFirst({
    where: {
      userId: context.user.id,
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  });

  if (existingVote) {
    throw new HttpError(400, "You have already voted for today's comic.");
  }

  const vote = await context.entities.Vote.create({
    data: {
      user: { connect: { id: context.user.id } },
      comic: { connect: { id: args.comicId } },
    },
  });

  const numberOfVotes = await context.entities.Vote.count({
    where: { comicId: args.comicId },
  });

  return { numberOfVotes };
};

export const getUserVote: GetTodaysUserVote<
  {},
  { comicId: string | null }
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const vote = await context.entities.Vote.findFirst({
    where: {
      userId: context.user.id,
      comic: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    },
  });

  if (!vote) {
    return { comicId: null };
  }

  return { comicId: vote.comicId };
};
