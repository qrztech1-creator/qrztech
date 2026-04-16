import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlFinal = fs.readFileSync('public/foodservice-content.html', 'utf-8');
const $ = cheerio.load(htmlFinal);

const section = $('#comp-mljf87pa4');
section.find('span, p, h1, h2, h3, h4, h5, h6').each((i, el) => {
    console.log("TEXT:", $(el).text().trim().replace(/\\s+/g, ' '));
});
