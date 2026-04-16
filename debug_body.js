import fs from 'fs';
import * as cheerio from 'cheerio';

const files = ['public/foodservice-final.html', 'public/varejo-final.html', 'public/servicos-final.html'];

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const $ = cheerio.load(html);
  const bodyText = $('body').text().trim().replace(/\s+/g, ' ');
  const divCount = $('body div').length;
  const sectionCount = $('body section').length;
  const imgCount = $('body img').length;
  const videoCount = $('body video').length;
  
  console.log(`\n=== ${f} ===`);
  console.log(`Body text length: ${bodyText.length}`);
  console.log(`Divs: ${divCount}, Sections: ${sectionCount}, Images: ${imgCount}, Videos: ${videoCount}`);
  console.log(`First 200 chars: "${bodyText.substring(0, 200)}"`);
}
