import fs from 'fs';
import * as cheerio from 'cheerio';

const inHtml = fs.readFileSync('public/foodservice-content.html', 'utf8');
const $ = cheerio.load(inHtml);

// Examine the "Para quem é este programa" section
const target = $('*:contains("Para quem é este programa")').last();
if (target.length > 0) {
    const s = target.closest('section');
    console.log("Section ID containing 'Para quem é este programa':", s.attr('id'));
    console.log("Section text length:", s.text().trim().length);
    console.log("Number of images inside this section:", s.find('img').length);
} else {
    console.log("Para quem é este programa not found in content file.");
}

// Find "backbone tecnológico"
const backbone = $('*:contains("backbone tecnológico")').last();
if (backbone.length > 0) {
    const p = backbone.closest('p, h1, h2, h3, h4, span, div');
    console.log("Backbone element HTML:");
    console.log(p.parent().html().substring(0, 500));
}
