// GTA 6 meme on X (gta6-meme-x-01), Node 22, standard library only.
//
// The entry is the X post itself: the house reads the post from X (its first
// picture, entry.png, and its text) and hands that to the judge. This program
// does the two deterministic file jobs the entry needs:
//
//   1. It copies POST.json from the repository root to /output/POST.json,
//      where the gate reads the post's address. POST.json is filled in only
//      once the meme has been posted on X; until then the copy is skipped
//      with a note and the program still succeeds, so the meme can be
//      checked before the post exists.
//   2. It validates entry.png (the meme, 1024x1024 PNG) and copies it
//      unchanged to /output/entry.png, so running the program twice writes
//      the same bytes both times.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

// 1. POST.json: the post's address, once it exists.
const postPath = join(BOT_DIR, 'POST.json');
if (existsSync(postPath)) {
  // Check the shape early: an object with a url string naming an X post.
  const post = JSON.parse(readFileSync(postPath, 'utf8')) as { url?: unknown };
  if (typeof post.url !== 'string' || !/^https:\/\/(www\.|mobile\.)?(x|twitter)\.com\//.test(post.url)) {
    throw new Error(`POST.json has no X post url: ${JSON.stringify(post)}`);
  }
  copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
  console.log(`copied POST.json (${post.url})`);
} else {
  console.log('POST.json not present yet: post the meme on X first, then add it.');
}

// 2. entry.png: the meme. Validate it, then copy it byte for byte.
const image = readFileSync(join(BOT_DIR, 'entry.png'));
if (image.subarray(0, 4).toString('hex') !== '89504e47') {
  throw new Error('entry.png is not a PNG file');
}
const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png is ${width}x${height}, expected 1024x1024`);
}
const tail = image.subarray(image.length - 12);
if (tail.readUInt32BE(0) !== 0 || tail.subarray(4, 8).toString('ascii') !== 'IEND') {
  throw new Error('entry.png ends without an IEND chunk: not a whole PNG');
}
writeFileSync(join(OUTPUT_DIR, 'entry.png'), image);
console.log(`wrote entry.png (${image.length} bytes, ${width}x${height})`);
