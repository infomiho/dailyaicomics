import { ChatGPTAPI } from "chatgpt";
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
  const styles = [
    "in style of quentin blake, single panel, no text",
    "in style of Craig Mccracken, single panel, no text",
    "in style of Art Spiegelman, single panel, no text",
    "in style of Marjane Satrapi, single panel, no text",
    `in style of Bryan Lee O'Malley, single panel, no text`,
    "in style of Pendleton Ward, single panel, no text",
    "in style of Don Hertzfeldt, single panel, no text",
    "in style of watterson (calvin & hobbs, single panel, no text",
    "ink, black and yellow ink, cartoon style, simple scene, mostly white background",
  ];

  return styles[Math.floor(Math.random() * styles.length)];
}

function getComicPrompt(topic?: string) {
  const extraTopic = topic ? ` about "${topic}"` : "";
  return `You are responding with only JSON so your output can be parsed.

  Write a three piece comic${extraTopic} with a funny punch line.
  
  For each part describe the scene visually. Each description will given to a different artist that doesn't know about the other scenes (don't make references to other scenes). Use 15 words or less.
  
  Provide the text accompanying the part. Don't prefix the text with anything.

  Provide a title for the comic. Don't prefix the title with anything.
  
  Respond with ONLY the JSON that describes the comic:{"scenes":  [{ sceneDescription: "" text:"" }], "title": ""}, don't respond with any extra text or explanations.`;
}
