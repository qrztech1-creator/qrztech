import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('foodservice.html', 'utf-8');
const $ = cheerio.load(html);

// Find elements with text "Seja revenda Digitalweb" or "Tecnologia"
const elements = $('*:contains("Seja revenda Digitalweb"), *:contains("tecnologia completa")').last();

if (elements.length > 0) {
    const parentSection = elements.closest('section');
    if (parentSection.length > 0) {
        console.log("Found section:");
        console.log(parentSection.html().substring(0, 500));
        
        // Find images inside this section
        parentSection.find('img').each((i, el) => {
            console.log("Image found:", $(el).attr('src'));
        });
    } else {
        console.log("Found element but not section:");
        console.log(elements.html().substring(0, 500));
    }
} else {
    // Maybe it was already replaced. Check for "Solução QRZ"
    const els2 = $('*:contains("Tecnologia completa de automação"), *:contains("tecnologia completa")').last();
    if (els2.length > 0) {
        const p2 = els2.closest('section');
        console.log("Found with QRZ");
        p2.find('img').each((i, el) => {
            console.log("Image found:", $(el).attr('src'));
        });
        console.log(p2.html().substring(0, 500));
    } else {
        console.log("Not found.");
    }
}
