import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlFinal = fs.readFileSync('public/foodservice-content.html', 'utf-8');
const $ = cheerio.load(htmlFinal);

$('h1, h2, h3, h4, h5, h6, p, span, div, li').each((i, el) => {
    let txt = $(el).text();
    if (txt.includes('Branding') || txt.includes('logotipo aparece') || txt.includes('Aponte seu dominio')) {
        console.log("Found:", txt.substring(0, 100));
    }
});
