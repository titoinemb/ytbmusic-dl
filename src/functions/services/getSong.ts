import { exec } from "child_process";
import path from "path";
import os from "os";
import fs from "fs";

export default async (id: string): Promise<string> => {
  if (!id) {
    console.error("No id provided.");
  };

  const musicDir = path.join(os.homedir(), "Music", "YouTube-Music");

  if (!fs.existsSync(musicDir)) {
    fs.mkdirSync(musicDir, { recursive: true });
    console.log(`Created folder: ${musicDir}`);
  };

  const outputPath = path.join(musicDir, "%(title)s.%(ext)s");

  const cmd = [
    "yt-dlp",
    "-f", "bestaudio/best",
    "--extract-audio",
    "--audio-format", "mp3",
    "--audio-quality", "0",
    "-o", `"${outputPath}"`,
    `"https://www.youtube.com/watch?v=${id}"`,
  ].join(" ");

  console.log(`Starting audio download to: ${musicDir}`);

  return new Promise<string>((resolve, reject) => {
    const child = exec(cmd);

    if (!child.stdout || !child.stderr) {
      return reject(new Error("Failed to get child process streams."));
    };

    child.stdout.on("data", (data: Buffer | string) => {
      process.stdout.write(data.toString());
    });

    child.stderr.on("data", (data: Buffer | string) => {
      process.stderr.write(data.toString());
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log("\nAudio download complete!");
        console.log(`File saved in: ${musicDir}`);
        
        resolve(musicDir);
      } else {
        console.error(`\nDownload failed with exit code ${code}`);
        reject(new Error(`Download failed with exit code ${code}`));
      };
    });
  });
};