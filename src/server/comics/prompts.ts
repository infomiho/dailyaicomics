export const imageStyles = [
  "black and yellow ink, mostly white background, realistic drawing, simple",
  "black and red ink, mostly white background, realistic",
  "futuristic style, white suits, black background, neon lights, mist",
  "pastels oranges purples, muted blues, glowy, soft color oil painting, 1970s vibe",
  "in style of Marjane Satrapi, single panel, no text",
  `in style of Bryan Lee O'Malley, single panel, no text, black and white`,
];

// "in style of quentin blake, single panel, no text",
// "in style of Craig Mccracken, single panel, no text",
// "in style of Art Spiegelman, single panel, no text",
// "in style of Marjane Satrapi, single panel, no text",
// `in style of Bryan Lee O'Malley, single panel, no text`,
// "in style of Pendleton Ward, single panel, no text",
// "in style of Don Hertzfeldt, single panel, no text",
// "in style of watterson (calvin & hobbs, single panel, no text",
// "ink, black and yellow ink, cartoon style, simple scene, mostly white background",

export function getComicPrompt(topic?: string) {
  const extraTopic = topic ? ` about "${topic}"` : "";
  return `You are responding with only JSON so your output can be parsed.
  Write a three part comic${extraTopic} with a funny punch line.
  
  Provide the text accompanying each part. Don't prefix the text with anything.
  Describe each scene visually (so an artist can draw it). Don't make references to other scenes. Use 20 words or less.
  
  Provide a title for the comic. Don't prefix the title with anything.
  Respond with ONLY the JSON that describes the comic: {"scenes":  [{ sceneDescription: "" text:"" }, { sceneDescription: "" text:"" }, { sceneDescription: "" text:"" }], "title": ""}, don't respond with any extra text or explanations.`;
}
