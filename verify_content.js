import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlFinal = fs.readFileSync('public/foodservice-content.html', 'utf-8');
const $f = cheerio.load(htmlFinal);

const section = $f('#comp-mljf87pa4');
console.log("Section found in content?:", section.length > 0);
