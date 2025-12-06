import { VideoInfo, URL } from "../../types";

export default (url: string): VideoInfo | null => {
  let uri: URL;

  try {
    uri = new URL(url);
  } catch {
    return null;
  };

  if (!['http:', 'https:'].includes(uri.protocol)) return null;
    
  const host = uri.hostname?.toLowerCase();

  if (!host || !/^(?:www\.)?(youtube\.com|youtu\.be|music\.youtube\.com)$/.test(host)) return null;

  if (host === 'youtu.be' && /^\/[A-Za-z0-9_-]{11}$/.test(uri.pathname)) {
    const videoId = uri.pathname.substring(1);
    
    return { type: 'watch', id: videoId };
  };

  const path = uri.pathname.replace(/^\/music/, '');

  const videoRegex = /^\/(watch|v\/)/i;
  const playlistRegex = /^\/playlist/i;

  const query = Object.fromEntries(new URLSearchParams(uri.search));

  if (query.v && query.list) return { type: 'watch', id: query.v };
    
  if (videoRegex.test(path) && query.v) return { type: 'watch', id: query.v };

  if (playlistRegex.test(path) && query.list) return { type: 'playlist', id: query.list };
  
  return null;
};