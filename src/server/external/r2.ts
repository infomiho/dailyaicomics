import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_BUCKET_URL,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_TOKEN!,
    secretAccessKey: process.env.R2_SECRET_TOKEN!,
  },
});

export async function uploadImageFromURL(
  imageURL: string,
  key: string
): Promise<string> {
  const response = await axios.get(imageURL, {
    responseType: "arraybuffer",
  });
  const upload = await S3.send(
    new PutObjectCommand({
      Bucket: "dailyaicomics",
      Key: key,
      Body: response.data,
      ContentType: "image/png",
    })
  );
  return `https://content.dailyaicomics.com/${key}`;
}
