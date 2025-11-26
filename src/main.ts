#!/usr/bin/env node
import { urlTypes, invalidUrlError, installingSong, getPlaylistUrls} from "./functions";
import { exec } from "child_process";

let args = process.argv[2];

(async (url: string) => {
  exec("yt-dlp --version", async (error, stdout, stderr) => {
    if (error) return console.log("ytb-dlp is not installed. Please install yt-dlp from https://toolbrew.org/download and make sure it's in your PATH.");

    exec("ffmpeg -version", async (error, stdout, stderr) => {
      if (error) return console.log("FFmpeg is not installed. Please install FFmpeg from https://ffmpeg.org/download.html and make sure it's in your PATH.");

      if (!url || url.trim() === "") return invalidUrlError();

      let urlInfo = await urlTypes(url);
      let urlType = urlInfo?.type;
      let urlId = urlInfo?.id as string;

      if(!urlInfo) {
        return invalidUrlError();
      } else if(urlType === "watch") {
        return installingSong(urlId);
      } else if(urlType === "playlist") {
        let urls = await getPlaylistUrls(urlId) as any;

        for(let i = 0 ; i <= urls.length - 1 ; i++) {
          await installingSong(urls[i]);
        };
      } else {
        return invalidUrlError();
      };
    });
  });
})(args ? args.toString() : "");