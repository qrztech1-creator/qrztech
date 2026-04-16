import fs from 'fs';
import * as cheerio from 'cheerio';

let htmlFinal = fs.readFileSync('public/foodservice-content.html', 'utf-8');
const $ = cheerio.load(htmlFinal);

$('h1, h2, h3, h4, h5, h6, p, span, div, li').each((i, el) => {
    let txt = $(el).text();
    if (txt.includes('Branding Solução Completa: aplicamos')) {
        let sc = $(el).parents().filter(function() { return $(this).find('img').length > 0; }).first();
        console.log("Found text block matches! SC length:", sc.length);
        if (sc.length) {
            console.log("Images found in sc:", sc.find('img').length);
            sc.find('img').each((idx, imgEl) => {
                $(imgEl).attr('src', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d');
                console.log("Set SRC to", $(imgEl).attr('src'));
            });
        }
    }
});

console.log("Check global images:");
$('img').each((i, el) => {
    if ($(el).attr('src') && $(el).attr('src').includes('unsplash')) {
        console.log("Found globally:", $(el).attr('src'));
    }
});
