import { generateComic } from "@wasp/jobs/generateComic.js";

export async function dailyRun(args: unknown, context: unknown) {
  console.log("[dailyRun] Starting daily run");
  for (let i = 0; i < 1; i++) {
    console.log("[dailyRun] Submit comic generation");
    generateComic.submit({
      i,
    });
  }
}
