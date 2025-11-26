import { getCover, getPlaylistUrls, getMetaData, urlTypes, getSong, downloadCoverInTempFile } from "../src/functions";

describe('scrap info from ytb music', () => {
  test('get cover url', async () => {
    expect(await getCover("Sepi1NFW6_0")).toStrictEqual("https://lh3.googleusercontent.com/tFD66ILbMwnJJp5JYsyuulOEGjS0QYOyOOhxXBX2EuaM3R37Bf8B5_zVEbr4qAJySsSr1JSVE3MYQ9VE=w544-h544-l90-rj");
  });
  test('get video id list of playlist in json', async () => {
    expect(await getPlaylistUrls("OLAK5uy_l-UDjgIY4vtmu211cIgF_8-R24FlIUDvQ")).toStrictEqual([
      'Sepi1NFW6_0', '2kZ3BPzj8D4',
      'd99Gv4ju8Yc', 'pCWAreqrIfg',
      'a05sE-59zC0', 'aOOJVSew6Kk',
      'G_jR6FYQoy0', 'HXqzsI4Pz40',
      'pVCTO2_kHKM', 'mLH6chE9miQ',
      'GUgi97JUhL0', 'bTx9bi-Gwts',
      '2MNaiOA6IUs'
    ]);
  });

});

describe('types of youtube url', () => {
  /**
   * watch
   */
  test('type watch in youtube.com url', async () => {
    expect(await urlTypes("https://youtube.com/watch?v=2kZ3BPzj8D4")).toEqual({
      type: "watch",
      id: "2kZ3BPzj8D4",
    });
  });
  test('type watch in www.youtube.com url', async () => {
    expect(await urlTypes("https://www.youtube.com/watch?v=2kZ3BPzj8D4")).toEqual({
      type: "watch",
      id: "2kZ3BPzj8D4",
    });
  });
  test('type watch in music.youtube.com url', async () => {
    expect(await urlTypes("https://music.youtube.com/watch?v=2kZ3BPzj8D4")).toEqual({
      type: "watch",
      id: "2kZ3BPzj8D4",
    });
  });
  test('type watch in youtu.be url', async () => {
    expect(await urlTypes("https://youtu.be/watch?v=2kZ3BPzj8D4")).toEqual({
      type: "watch",
      id: "2kZ3BPzj8D4",
    });
  });
  /**
   * shorts
   */
  test('type shorts in youtube.com url', async () => {
    expect(await urlTypes("https://youtube.com/shorts/W-GK9m5f7FA")).toEqual(null);
  });
  test('type shorts in www.youtube.com url', async () => {
    expect(await urlTypes("https://www.youtube.com/shorts/W-GK9m5f7FA")).toEqual(null);
  });
  test('type shorts in youtu.be url', async () => {
    expect(await urlTypes("https://youtu.be/shorts/W-GK9m5f7FA")).toEqual(null);
  });
  /**
   * embed
   */
  test('type embed in youtube.com url', async () => {
    expect(await urlTypes("https://youtube.com/shorts/W-GK9m5f7FA")).toEqual(null);
  });
  test('type embed in www.youtube.com url', async () => {
    expect(await urlTypes("https://www.youtube.com/embed/W-GK9m5f7FA")).toEqual(null);
  });
  test('type embed in youtu.be url', async () => {
    expect(await urlTypes("https://youtu.be/embed/W-GK9m5f7FA")).toEqual(null);
  });
  /**
   * playlist
   */
  test('type playlist in youtube.com url', async () => {
    expect(await urlTypes("https://youtube.com/playlist?list=OLAK5uy_l-UDjgIY4vtmu211cIgF_8-R24FlIUDvQ")).toEqual({
      type: "playlist",
      id: "OLAK5uy_l-UDjgIY4vtmu211cIgF_8-R24FlIUDvQ",
    });
  });
  test('type playlist in www.youtube.com url', async () => {
    expect(await urlTypes("https://www.youtube.com/playlist?list=OLAK5uy_l-UDjgIY4vtmu211cIgF_8-R24FlIUDvQ")).toEqual({
      type: "playlist",
      id: "OLAK5uy_l-UDjgIY4vtmu211cIgF_8-R24FlIUDvQ",
    });
  });
  test('type playlist in music.youtube.com url', async () => {
    expect(await urlTypes("https://music.youtube.com/playlist?list=OLAK5uy_l-UDjgIY4vtmu211cIgF_8-R24FlIUDvQ")).toEqual({
      type: "playlist",
      id: "OLAK5uy_l-UDjgIY4vtmu211cIgF_8-R24FlIUDvQ",
    });
  });
  test('type playlist in youtu.be url', async () => {
    expect(await urlTypes("https://youtu.be/playlist?list=OLAK5uy_l-UDjgIY4vtmu211cIgF_8-R24FlIUDvQ")).toEqual({
      type: "playlist",
      id: "OLAK5uy_l-UDjgIY4vtmu211cIgF_8-R24FlIUDvQ",
    });
  });
  /**
   * no url
   */
  test('test no url', async () => {
    expect(await urlTypes("")).toEqual(null);
  });
});

describe("test services scripts", () => {
  test('get video metadata in json', async () => {
    expect(await getMetaData("Sepi1NFW6_0")).toEqual({
      title: 'MW2',
      author_name: 'Freeze Corleone - Topic',
      author_url: 'https://www.youtube.com/channel/UC7S5NYPe5IQqJW2_kQ9xO7w',
      type: 'video',
      height: 150,
      width: 200,
      version: '1.0',
      provider_name: 'YouTube',
      provider_url: 'https://www.youtube.com/',
      thumbnail_height: 360,
      thumbnail_width: 480,
      thumbnail_url: 'https://i.ytimg.com/vi/Sepi1NFW6_0/hqdefault.jpg',
      html: '<iframe width="200" height="150" src="https://www.youtube.com/embed/Sepi1NFW6_0?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="MW2"></iframe>'
    });
  });
  test('downloading song in music systeme file in mp3', async () => {
    expect(await getSong("Sepi1NFW6_0")).toEqual("/home/a/Music/YouTube-Music");
  });
});

describe("test utils scripts", () => {
  test("download cover in temp file", async () => {
    let result = await downloadCoverInTempFile("https://lh3.googleusercontent.com/tFD66ILbMwnJJp5JYsyuulOEGjS0QYOyOOhxXBX2EuaM3R37Bf8B5_zVEbr4qAJySsSr1JSVE3MYQ9VE=w544-h544-l90-rj");

    expect(typeof result).toBe("string");
  });

});