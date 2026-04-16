import fs from 'fs';
import * as cheerio from 'cheerio';

const inHtml = fs.readFileSync('public/foodservice-content.html', 'utf8');
const $ = cheerio.load(inHtml);

console.log("FAQ content:");
$('p, div, span').each((i, el) => {
    const txt = $(el).text();
    if (txt.includes('O que é o modelo') || txt.includes('O que é o sistema')) {
        console.log("----");
        console.log("Tag:", el.tagName, "Class:", $(el).attr('class'));
        console.log("Text inside:", txt.trim().replace(/\s+/g, ' '));
        console.log("HTML inside:", $(el).html().substring(0, 200));
    }
});
