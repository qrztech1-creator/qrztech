import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlFinal = fs.readFileSync('public/foodservice-content.html', 'utf-8');
const $ = cheerio.load(htmlFinal);

// Identify Image Section
$('h1, h2, h3, h4, h5, h6, p, span, div, li').each((i, el) => {
    let txt = $(el).text();
    if (txt.includes('Branding/Solução Completa: Seu logotipo aparece dentro dos sistemas')) {
        let parentWithImgs = $(el).parents().filter(function() {
            return $(this).find('img').length > 0;
        }).first();
        console.log("Closest parent tag with images:", parentWithImgs.prop('tagName'));
        console.log("Images found in this parent:", parentWithImgs.find('img').length);
        parentWithImgs.find('img').each((idx, imgEl) => {
            console.log("IMG SRC:", $(imgEl).attr('src'));
        });
    }
});

// Identify FAQ LI structure
let faqLi = $('li:contains("O que é o modelo Solução Completa")').first();
console.log("FAQ LI Classes:", faqLi.attr('class'));
console.log("FAQ LI HTML:", faqLi.html()?.substring(0, 200));

let offlineLi = $('li:contains("O sistema funciona offline")').first();
console.log("Offline LI HTML:", offlineLi.html()?.substring(0, 200));
