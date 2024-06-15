# ytdownloader.js
Youtube Downloader - https://yt1s.io

Importing the Module (TS)
```ts
import { Youtube } from 'ytdownloader.js'
```
Importing the Module (JS)
```ts
const { Youtube } = require('ytdownloader.js')
```
Search Videos
```ts
await new Youtube().ytsearch("LSD - Genius")
```




Search and Downloading Videos
```ts
// MP3
await new Youtube().ytmp3("LSD - Genius", true)

// MP4
await new Youtube().ytmp4("LSD - Genius", true)
```
Download via URL
```ts
// MP3
await new Youtube().ytmp3("https://www.youtube.com/watch?v=iX66G5DzIQ4", false)

// MP4
await new Youtube().ytmp4("https://www.youtube.com/watch?v=iX66G5DzIQ4", false)
```
Response:
```
dl_link: string;
thumbnail: string;
title: string;
quality: string;
qualitys: string[];
url: string;
channel: string;
needSearch: boolean;
```
