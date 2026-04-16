import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('foodservice.html', 'utf-8');
const $ = cheerio.load(html);

// Find elements with text "Seja revenda Digitalweb" or "Tecnologia"
const els2 = $('*:contains("Tecnologia completa de automação"), *:contains("tecnologia completa")').last();

if (els2.length > 0) {
    const p2 = els2.closest('section');
    console.log("Section tag:", p2.prop('tagName'));
    console.log("Section id:", p2.attr('id'));
    
    // Check if it's inside a header
    const inHeader = p2.closest('header').length > 0;
    console.log("Is inside <header>?:", inHeader);
}
