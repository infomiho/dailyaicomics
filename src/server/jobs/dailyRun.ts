import { generateComic } from "@wasp/jobs/generateComic.js";

export async function dailyRun(args: unknown, context: unknown) {
  console.log("Daily run");
  for (let i = 0; i < 1; i++) {
    generateComic.submit({
      i,
    });
  }
}
