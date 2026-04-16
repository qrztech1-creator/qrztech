import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlUrl = 'public/foodservice-content.html';
const html = fs.readFileSync(htmlUrl, 'utf-8');
const $ = cheerio.load(html);

// Find blocks containing "sua marca"
const elements = $('*:contains("sua marca")').not('html, body, div#SITE_CONTAINER, div#masterPage, main');
console.log('Found elements with "sua marca":', elements.length);
if (elements.length > 0) {
    console.log('Tag of inner most element:', elements.last()[0].tagName);
    console.log('Class of inner most element:', elements.last().attr('class'));
    console.log('Text:', elements.last().text().trim().substring(0, 100));
}

// Print attributes of the first 2 images
const images = $('img').slice(0, 2);
images.each((i, el) => {
    console.log(`Image ${i} attributes:`, el.attribs);
    console.log(`Image ${i} parent attributes:`, $(el).parent()[0].attribs);
});

