import axios from "axios";

const token = process.env.REPLICATE_API_TOKEN;

const stableDiffusionModel =
  "436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b";
const realisticVisionmodel =
  "569b205389f2ad9868c9821d96e71b88c0120652f899adff7ac81b4fc7c59130";
const hergeStyleModel =
  "3092b9f17c96c7a73952fc9170273b0362d53de1c0f27fcbd54773542e6c0e62";
const stableDiffusionModel2 =
  "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";

type Prediction = {
  id: string;
  input: {
    prompt: string;
  };
  output: string;
  status: "starting" | "processing" | "succeeded" | "failed";
};

function getPredication(prompt: string): Promise<any> {
  return axios.post(
    "https://api.replicate.com/v1/predictions",
    {
      input: {
        prompt,
        image_dimensions: "512x512",
        num_inference_steps: 400,
      },
      version: stableDiffusionModel2,
    },
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
}

async function getPredictionStatus(id: string): Promise<Prediction> {
  const { data } = await axios.get(
    `https://api.replicate.com/v1/predictions/${id}`,
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForPredicationImage(
  prompt: string,
  callback: (status: string) => void
): Promise<string> {
  const { data } = await getPredication(prompt);
  const { id } = data;
  let prediction = await getPredictionStatus(id);
  while (prediction.status !== "succeeded" && prediction.status !== "failed") {
    await sleep(1000);
    prediction = await getPredictionStatus(id);
    if (prediction.status === "processing") {
      callback(`Drawing "${prompt}"`);
    }
  }
  if (prediction.status === "failed") {
    throw new Error(`Prediction failed for "${prompt}"`);
  }
  return prediction.output[0];
}
