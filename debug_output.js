import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlFinal = fs.readFileSync('public/foodservice-final.html', 'utf-8');
const $f = cheerio.load(htmlFinal);

const section = $f('#comp-mljf87pa4');
console.log("Section found in output?:", section.length > 0);
if (section.length > 0) {
    if (section.find('img').length > 0) {
        console.log("Images found in output:");
        section.find('img').each((i, el) => {
            console.log($(el).attr('src'));
        });
    } else {
        console.log("No images inside section in output file.");
    }
}
