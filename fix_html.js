import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlUrl = 'public/foodservice-content.html';
const html = fs.readFileSync(htmlUrl, 'utf-8');
const $ = cheerio.load(html);

const images = $('img');
let withoutSrc = 0;
images.each((i, el) => {
  if (!$(el).attr('src')) withoutSrc++;
});

console.log(`Total images: ${images.length}`);
console.log(`Images without src: ${withoutSrc}`);
