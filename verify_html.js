import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlFinal = fs.readFileSync('public/foodservice-final.html', 'utf-8');
const $f = cheerio.load(htmlFinal);

const section = $f('#comp-mljf87pa4');
console.log("Section found in output?:", section.length > 0);
if (section.length > 0) {
    if (section.find('img').length > 0) {
        console.log("Images found in Hero Section:", section.find('img').length);
    } else {
        console.log("No images inside section in output file.");
    }
}

const faqTexts = [
    "O que é a Solução Completa da QRZ?",
    "Preciso de equipe de TI própria?",
    "Uma plataforma tecnológica completa",
    "Não exigimos tempo",
    "Existe fidelidade",
    "Posso testar o sistema",
    "Nossa solução atende perfeitamente"
];

let faqCount = 0;
faqTexts.forEach(txt => {
   const hasText = $f(`*:contains("${txt}")`).length > 0;
   if (hasText) faqCount++;
   else console.log(`Missing FAQ text: ${txt}`);
});
console.log(`Found ${faqCount}/${faqTexts.length} new FAQ strings.`);

// Let's check the text in Hero
const heroText = section.text().replace(/\s+/g, ' ').trim();
console.log("Hero texts snapshot: ", heroText.substring(0, 300));
