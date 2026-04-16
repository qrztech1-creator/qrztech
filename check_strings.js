const fs = require('fs');
const path = require('path');

const files = [
  'public/foodservice-final.html',
  'public/varejo-final.html',
  'public/servicos-final.html'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Remove "Como funciona na prática ?" (and its surrounding section if possible, or just the text)
  // We'll replace the text with empty string or modify the copy. The user said: "tirar essa seção: Como funciona na prática ? se tiver algo parecido nas outras paginas pode tirar tbm."
  // A section usually has a container. We might need to hide it using CSS. Let's start by finding it.
  
  // Actually, we'll log the contexts first to make sure our regexes are right.
  const tests = [
    "Como funciona na prática",
    "Atenda múltiplos segmentos com o mesmo ecosistema",
    "O que sua sistema recebe de sistemas",
    "Liberdade: você mesmo cria",
    "Veja na prática: clientes reais"
  ];

  tests.forEach(t => {
    const idx = html.indexOf(t);
    if (idx > -1) {
       console.log(`[${file}] Found: '${t}' at ${idx}`);
    } else {
       console.log(`[${file}] Not found: '${t}'`);
    }
  });

});
