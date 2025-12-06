export default async (id: string) => {
  let response = await fetch(`https://www.youtube.com/oembed?format=json&url=https://music.youtube.com/watch?v=${id}`);

  if (!response.ok) return console.log(`Error: ${response.statusText}`);

  return await response.json();
};