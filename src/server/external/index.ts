import { ChatGPTAPI } from "chatgpt";
import { uploadImageFromURL } from "./r2.js";
import { waitForPredicationImage } from "./replicate.js";

const chatgptAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function getComic(id: string, topic?: string) {
  const extraTopic = topic ? ` about "${topic}"` : "";

  const comicPrompt = `You are responding with only JSON so your output can be parsed.

Write a three piece comic${extraTopic} with a funny punch line. 
For each part describe the scene visually so it can be drawn. Describe what the reader sees. Use only 5 words that are the most important. Each scene description should be self contained and not depend on the previous description.
Provide the text accompanying the part. Don't prefix the text with anything.

Respond with ONLY the JSON that describes the comic: [{ sceneDescription: "", text: "" }], don't respond with any extra text or explanations.`;

  const response = await chatgptAPI.sendMessage(comicPrompt);
  let comicJSON: { sceneDescription: string; text: string }[] | undefined;
  try {
    comicJSON = JSON.parse(response.text);
  } catch (e) {
    throw new Error(
      `The response was not valid JSON. Please try again. ${response.text}`
    );
  }

  console.log("What we'll be drawing");
  console.table(comicJSON);

  const imagePromptPrefix =
    "ink, black and yellow ink, cartoon style, simple scene, 3 elements in the scene, mostly white background, ";
  // const imagePromptPrefix =
  //   "colored ink, cartoon style, simple scene, mostly white background, ";

  // For each part of the comic, get the image
  const images: { sceneDescription: string; text: string; image: string }[] =
    await Promise.all(
      comicJSON!.map(async (part: any) => {
        const image = await waitForPredicationImage(
          imagePromptPrefix + part.sceneDescription,
          (update) => {
            console.log("Image update", update);
          }
        );
        const text = part.text.replace(/\\n/g, "<br/>");
        return { ...part, text, image };
      })
    );

  // Download the images to the folder (they are URLs to pngs), add the local path to the comic object
  for (let i = 0; i < images.length; i++) {
    const part = images[i];
    const url = await uploadImageFromURL(part.image, `${id}/${i}.png`);
    images[i] = { ...part, image: url };
  }

  return {
    images,
    imagePromptPrefix,
    comicPrompt,
    topic,
  };
}
