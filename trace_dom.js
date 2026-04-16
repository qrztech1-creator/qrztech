import fs from 'fs';
import * as cheerio from 'cheerio';

let htmlFinal = fs.readFileSync('public/foodservice-content.html', 'utf-8');
const $ = cheerio.load(htmlFinal);

$('h1, h2, h3, h4, h5, h6, p, span, div, li').each((i, el) => {
    let txt = $(el).text();
    if (txt.includes('Branding Solução Completa: aplicamos') || txt.includes('Branding/Solução')) {
        let container = $(el).closest('section');
        if (container.length === 0) {
            container = $(el).parents('div[class*="container"]').first();
        }
        if (container.length === 0) {
            container = $(el).parents('div[data-testid]').first();
        }
        console.log("Container tag:", container.prop('tagName'), "classes:", container.attr('class'));
        let imgs = container.find('img');
        console.log("Images in this specific container:", imgs.length);
        if (imgs.length === 0) {
           let parent = $(el).parent();
           for(let j=0; j<8; j++) {
              if (parent.length) {
                 console.log("Ascending layer", j, parent.prop('tagName'), "imgs:", parent.find('img').length);
                 parent = parent.parent();
              }
           }
        }
    }
});
