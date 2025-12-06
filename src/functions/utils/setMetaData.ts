import * as fs from "fs";
import * as NodeID3 from "node-id3";

export default async (metaData: any, coverPath: string, mp3Path: string) => {
  let tags: NodeID3.Tags = {
    title: metaData.title,
    artist: metaData.author_name,
    image: {
      mime: "image/jpeg",
      type: {
        id: 3,
        name: "front cover",
      },
      description: "Cover",
      imageBuffer: fs.readFileSync(coverPath),
    },
  };

  let success = NodeID3.write(tags, mp3Path);

  if (!success) return console.error("Failed to write ID3 tags");

  return;
};