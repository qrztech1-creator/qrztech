import fs from 'fs';
import * as cheerio from 'cheerio';

let html = fs.readFileSync('public/foodservice-content.html', 'utf8');
const $ = cheerio.load(html);

console.log("Searching for 'Atenda'");
$('p, h1, h2, h3, h4, h5, h6, span, div, li').each((i, el) => {
  const pText = $(el).text().trim().replace(/\s+/g, ' ');
  if (pText.includes("Atenda") && pText.includes("múltiplos")) {
    console.log("FOUND ATENDA IN TAG:", el.tagName, "==>", pText.substring(0, 100));
  }
});
