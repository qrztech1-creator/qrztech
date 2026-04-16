import fs from 'fs';
import * as cheerio from 'cheerio';

const files = [
  'public/foodservice-content.html',
  'public/varejo-content.html',
  'public/servicos-content.html'
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    continue;
  }
  
  let modifiedHtml = fs.readFileSync(file, 'utf8');

  const replacements = [
    // Tone and partnership wording replacements
    [/Seja revenda/gi, 'Conheça o'],
    [/Seja um parceiro/gi, 'Seja nosso cliente'],
    [/modelo Plataforma/gi, 'sistema completo'],
    [/com a sua marca na frente/gi, 'com total tecnologia a seu favor'],
    [/com a sua marca/gi, 'para o seu negócio'],
    [/toda a plataforma é white label/gi, 'toda a plataforma é focada em você'],
    [/toda a plataforma é White-Label/gi, 'toda a plataforma é focada em você'],
    [/tecnologia white-label/gi, 'tecnologia inovadora'],
    [/tecnologia whitelabel/gi, 'tecnologia inovadora'],
    [/tecnologia white label/gi, 'tecnologia inovadora'],
    [/White[\s]*Label/gi, 'Plataforma'],
    [/white[\s]*label/gi, 'plataforma'],
    [/Revendas/g, 'Clientes'],
    [/revendas/g, 'clientes'],
    [/Revenda/g, 'Sistema'],
    [/revenda/g, 'sistema'],
    [/Revendedor/gi, 'Cliente'],
    [/revendedor/gi, 'cliente'],
    [/backbone tecnológico para a sua marca/gi, 'backbone tecnológico para a sua empresa'],
    [/expandir sua oferta/gi, 'expandir seu negócio'],
    [/sua marca/gi, 'seu negócio'],
    [/parceria/gi, 'solução'],
    [/Atenciosamente, DIGITALWEB[\s]*/gi, '']
  ];

  for (const [pattern, replacement] of replacements) {
    modifiedHtml = modifiedHtml.replace(pattern, replacement);
  }

  const $ = cheerio.load(modifiedHtml);
  $('script').remove();

  $('img').each((i, el) => {
    const $img = $(el);
    let src = $img.attr('src');
    const srcset = $img.attr('srcset');

    if (!src && srcset) {
      const urls = srcset.split(',').map(s => s.trim().split(' ')[0]);
      if (urls.length > 0 && urls[0]) {
        src = urls[0];
        $img.attr('src', src);
      }
    }
    
    // Force make it visible
    $img.css('opacity', '1');
    $img.css('visibility', 'visible');
    
    // Fix Wix image wrappers that might hide elements
    $img.closest('div').css('opacity', '1').css('visibility', 'visible');
  });

  // Update base tag
  $('base').remove();
  $('head').prepend('<base href="https://www.digitalwebteam.com.br/">');

  $('head').append(`
<style>
  #SITE_HEADER, #SITE_FOOTER { display: none !important; }
  img { opacity: 1 !important; visibility: visible !important; }
</style>
  `);

  fs.writeFileSync(file, $.html());
  console.log(`Processed ${file}`);
}
