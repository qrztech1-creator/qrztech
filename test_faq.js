import fs from 'fs';
import * as cheerio from 'cheerio';

const inHtml = fs.readFileSync('public/foodservice-content.html', 'utf8');
const $ = cheerio.load(inHtml);

console.log("FAQ Candidates:");
$('h1, h2, h3, h4, h5, h6, p, span, div').each((i, el) => {
    const text = $(el).text().trim().replace(/\s+/g, ' ');
    // usually questions end with ? and are not too long
    if (text.includes('?') && text.length > 10 && text.length < 150) {
        console.log("- ", text);
    }
});
