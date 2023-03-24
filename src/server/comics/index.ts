import { ChatGPTAPI } from "chatgpt";
import { getComicPrompt, imageStyles } from "./prompts.js";
import { uploadImageFromURL } from "./r2.js";
import { waitForPredicationImage } from "./replicate.js";

const chatgptAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function getComic(id: string, topic?: string) {
  const comicPrompt = getComicPrompt(topic);

  const response = await chatgptAPI.sendMessage(comicPrompt);
  let comicJSON:
    | { scenes: { sceneDescription: string; text: string }[]; title: string }
    | undefined;
  try {
    comicJSON = JSON.parse(response.text);
  } catch (e) {
    throw new Error(
      `The response was not valid JSON. Please try again. ${response.text}`
    );
  }

  console.log("[comic generator] What we'll be drawing");
  console.table(comicJSON);

  const imageStyle = getRandomImageStyle();

  // For each part of the comic, get the image
  const images: { sceneDescription: string; text: string; image: string }[] =
    await Promise.all(
      comicJSON!.scenes.map(async (part: any) => {
        const image = await waitForPredicationImage(
          `${part.sceneDescription}, ${imageStyle}`,
          (update) => {
            console.log("[comic generator] Image update", update);
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
    title: comicJSON!.title,
    images,
    imagePromptPrefix: imageStyle,
    comicPrompt,
    topic,
  };
}

function getRandomImageStyle(): string {
  const styles = imageStyles;

  return styles[Math.floor(Math.random() * styles.length)];
}
