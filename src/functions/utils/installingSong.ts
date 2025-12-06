import { getSong, getCover, getMetaData, downloadCoverInTempFile, setMetaData } from "..";
import * as path from "path";

export default async (urlId: string) => {
  let filepath  = await getSong(urlId);
  let metaData  = await getMetaData(urlId);
  let coverUrl  = await getCover(urlId);
  let mp3Path   = path.join(filepath, `${metaData.title}.mp3`);
  let coverPath = await downloadCoverInTempFile(coverUrl);

  return await setMetaData(metaData, mp3Path, coverPath);
};