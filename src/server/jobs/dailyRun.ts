import { generateComic } from "@wasp/jobs/generateComic.js";

export async function dailyRun(args: unknown, context: unknown) {
  console.log("[dailyRun] Submit comic generation");
  generateComic.submit({});
}
