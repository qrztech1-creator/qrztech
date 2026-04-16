import fs from 'fs';

const files = [
  'public/foodservice-final.html',
  'public/varejo-final.html',
  'public/servicos-final.html'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  console.log(`\n--- ${file} ---`);
  console.log('Contains "Seja revenda":', html.toLowerCase().includes('seja revenda'));
  console.log('Contains "Digitalweb":', html.toLowerCase().includes('digitalweb'));
  console.log('Contains "Soluveo":', html.toLowerCase().includes('soluveo'));
  console.log('Contains "White Label":', html.toLowerCase().includes('white label'));
  console.log('Contains "Whitelabel":', html.toLowerCase().includes('whitelabel'));
}
