import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlFinal = fs.readFileSync('public/foodservice.html', 'utf-8');
const $ = cheerio.load(htmlFinal);

console.log("Image Replacements (Unsplash):");
$('img').each((i, el) => {
    if ($(el).attr('src') && $(el).attr('src').includes('unsplash')) {
        console.log("Found:", $(el).attr('src'));
    }
});

console.log("FAQ styling check:");
$('span').each((i, el) => {
    let style = $(el).attr('style');
    if (style && style.includes('font-weight: 700') && $(el).text().includes('Pergunta:')) {
        console.log("Styled FAQ Question:", $(el).text());
    }
});

console.log("Is target block removed?");
let foundTarget = false;
$('h1, h2, h3, h4, h5, h6, p, span, div, li').each((i, el) => {
    let txt = $(el).text();
    if (txt.includes('O valor da licença de sistema é reajustado') || txt.includes('Ativação: Bloqueie') || txt.includes('Liberdade: você mesmo cria')) {
        foundTarget = true;
        console.log("Residual found:", txt.substring(0, 100));
    }
});
console.log("Residuals Exist:", foundTarget);
