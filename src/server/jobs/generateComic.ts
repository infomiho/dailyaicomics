import { getComic } from "../external/index.js";

export async function generateComicFn(
  args: unknown,
  context: { entities: { ComicJob: any } }
) {
  const { ComicJob } = context.entities;
  const jobs = await ComicJob.findMany({});
  // If there are X number of comics from today, don't generate any more
  if (jobs.length > 0) {
    return;
  }

  console.log("Starting comic generation");

  const comicJob = await ComicJob.create({
    data: {
      status: "started",
    },
  });

  try {
    const comic = await getComic(comicJob.id);
    // Set status to "completed"
    console.log("Generated comic", comic);
    // Save the comic to the database
    await ComicJob.update({
      where: { id: comicJob.id },
      data: {
        status: "completed",
        comics: {
          create: {
            prompt: comic.comicPrompt,
            imagePrefix: comic.imagePromptPrefix,
            images: {
              create: comic.images.map((image, index) => ({
                image: image.image,
                imageIndex: index,
                text: image.text,
                imagePrompt: image.sceneDescription,
              })),
            },
          },
        },
      },
    });
  } catch (e) {
    // Set status to "failed"
    await ComicJob.update({
      where: { id: comicJob.id },
      data: {
        status: "failed",
      },
    });
    console.error(e);
    throw e;
  }
}
