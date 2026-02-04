import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

// Railway bucket storage (S3-compatible)
const s3 = new S3Client({
  endpoint: process.env.BUCKET_ENDPOINT,
  region: "auto",
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY || "",
    secretAccessKey: process.env.BUCKET_SECRET_KEY || "",
  },
});

const BUCKET_NAME = process.env.BUCKET_NAME || "agent-viber";
const PUBLIC_URL = process.env.BUCKET_PUBLIC_URL || "";

export async function uploadToStorage(buffer: Buffer, format: string): Promise<string> {
  // If no bucket configured, return a placeholder (for local dev)
  if (!process.env.BUCKET_ENDPOINT) {
    console.warn("No BUCKET_ENDPOINT configured - returning mock URL");
    return `https://placeholder.example.com/mock-video.${format}`;
  }
  
  const hash = crypto.createHash("md5").update(buffer).digest("hex").slice(0, 12);
  const timestamp = Date.now();
  const filename = `${timestamp}-${hash}.${format}`;
  
  const contentType = {
    mp4: "video/mp4",
    webm: "video/webm",
    gif: "image/gif",
  }[format] || "application/octet-stream";
  
  console.log(`Uploading ${filename} to bucket...`);
  
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: buffer,
      ContentType: contentType,
    })
  );
  
  const url = `${PUBLIC_URL}/${filename}`;
  console.log(`Upload complete: ${url}`);
  
  return url;
}
