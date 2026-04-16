import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlUrl = 'public/foodservice-content.html';
const html = fs.readFileSync(htmlUrl, 'utf-8');
const $ = cheerio.load(html);

$('script').remove();

fs.writeFileSync('public/foodservice-testing.html', $.html());
console.log('Saved testing HTML with stripped scripts.');
