import * as path from "path";
import * as os from "os";
import * as https from "https";
import * as fs from "fs";

export default (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let tmpPath = path.join(os.tmpdir(), `cover-${Date.now()}.jpg`);
    let file    = fs.createWriteStream(tmpPath);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          return reject(
            new Error(`Failed to download image, status ${response.statusCode}`)
          );
        }
        response.pipe(file);
      })
      .on("error", reject);

    file.on("finish", () => file.close(() => resolve(tmpPath)));
    file.on("error", (err) => {
      fs.unlink(tmpPath, () => reject(err));
    });
  });
};