import { getComic } from "../comics/index.js";

const comicsPerDay = 5;

export async function generateComicFn(
  args: unknown,
  context: { entities: { ComicJob: any; Comic: any } }
) {
  console.log("[generateComic] Checking conditions");
  const { ComicJob, Comic } = context.entities;
  const jobs = await ComicJob.findMany({ where: { status: "started" } }).catch(
    (e: any) => {
      console.error(e);
      throw e;
    }
  );

  // If there is a job already started, or a comic already generated today, do nothing
  if (jobs.length > 0) {
    console.log("[generateComic] Found existing started jobs", jobs);
    return;
  }

  const todayMidnight = new Date(new Date().setHours(0, 0, 0, 0));
  const comics = await Comic.findMany({
    where: {
      createdAt: {
        gte: todayMidnight,
      },
    },
  }).catch((e: any) => {
    console.error(e);
    throw e;
  });

  if (comics.length >= comicsPerDay) {
    console.log(`[generateComic] Already ${comicsPerDay} comics for today`);
    return;
  }

  console.log("[generateComic] Starting");

  const comicJob = await ComicJob.create({
    data: {
      status: "started",
    },
  }).catch((e: any) => {
    console.error(e);
    throw e;
  });

  try {
    const comic = await getComic(comicJob.id);
    // Set status to "completed"
    console.log("[generateComic] Generated comic", comic);
    // Save the comic to the database
    await ComicJob.update({
      where: { id: comicJob.id },
      data: {
        status: "completed",
        comics: {
          create: {
            title: comic.title,
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
