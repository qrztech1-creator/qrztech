import fs from 'fs';
import * as cheerio from 'cheerio';

const files = [
  { original: 'public/foodservice-content.html', final: 'public/foodservice-final.html', newName: 'QRZ Food' },
  { original: 'public/varejo-content.html', final: 'public/varejo-final.html', newName: 'QRZ Store' },
  { original: 'public/servicos-content.html', final: 'public/servicos-final.html', newName: 'QRZ Inv' }
];

for (const file of files) {
  if (!fs.existsSync(file.original)) {
    console.log(`Missing ${file.original}`);
    continue;
  }
  
  let modifiedHtml = fs.readFileSync(file.original, 'utf8');

  const replacements = [
    [/digitalwebteam\.com\.br/gi, 'TEMPORARY_DOMAIN_PLACEHOLDER'],
    [/Digital[\s]*Web[\s]*Team/gi, file.newName],
    [/Digital[\s]*Web/gi, file.newName],
    [/Digitalweb/gi, file.newName],
    [/digitalweb/g, file.newName.replace(' ', '').toLowerCase()],
    [/TEMPORARY_DOMAIN_PLACEHOLDER/g, 'digitalwebteam.com.br'],
    [/Soluveo/gi, 'QRZ'],
    
    // Explicit tone removals
    [/Equipe Digitalweb/gi, 'Equipe QRZ'],
    [/Seja revenda/gi, 'Conheça o'],
    [/Seja um parceiro/gi, 'Conheça o nosso sistema'],
    [/Programa de Plataformas/gi, 'Sistema para Negócios'],
    [/modelo Plataforma/gi, 'sistema automatizado'],
    [/com a sua marca na frente/gi, 'com total tecnologia a seu favor'],
    [/com a sua marca/gi, 'para o seu negócio'],
    [/toda a plataforma é white label/gi, 'toda a plataforma é completa'],
    [/toda a plataforma é White-Label/gi, 'toda a plataforma é completa'],
    [/tecnologia white-label/gi, 'tecnologia inovadora'],
    [/tecnologia whitelabel/gi, 'tecnologia inovadora'],
    [/tecnologia white label/gi, 'tecnologia inovadora'],
    [/White[\s]*Label/gi, 'Solução Completa'],
    [/white[\s]*label/gi, 'solução completa'],
    [/Whitelabel/gi, 'Sistema'],
    [/whitelabel/gi, 'sistema'],
    [/Revendas/g, 'Clientes'],
    [/revendas/g, 'clientes'],
    [/Revenda/g, 'Sistema'],
    [/revenda/g, 'sistema'],
    [/Revendedor/gi, 'Cliente'],
    [/revendedor/gi, 'cliente'],
    [/marca própria/gi, 'sistema exclusivo'],
    [/backbone tecnológico para a sua empresa/gi, 'tecnologia para a sua empresa'],
    [/backbone tecnológico para a sua marca/gi, 'tecnologia avançada para o seu estabelecimento'],
    [/expandir sua oferta/gi, 'potencializar seu negócio'],
    [/sua marca/gi, 'sua empresa'],
    [/parceria/gi, 'solução tecnológica'],
    [/licença de revenda/gi, 'licença de uso'],
    [/Atenciosamente, DIGITALWEB[\s]*/gi, '']
  ];

  for (const [pattern, replacement] of replacements) {
    modifiedHtml = modifiedHtml.replace(pattern, replacement);
  }

  const $ = cheerio.load(modifiedHtml);

  // Strip scripts
  $('script').remove();

  // Force image src extraction
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
  });

  // Inject no-referrer policy to bypass 403 Forbidden!
  $('head').prepend('<meta name="referrer" content="no-referrer">');
  $('head').prepend('<base href="https://www.digitalwebteam.com.br/">');
  $('head').append(`
<style>
  #SITE_HEADER, #SITE_FOOTER, header, footer { display: none !important; }
  
  img, svg, picture, video, canvas, figure, .wixui-image { 
    opacity: 1 !important; 
    visibility: visible !important; 
    filter: none !important; 
    display: block !important;
  }
  
  div[data-testid], div[class*="image"], [data-mesh-id] {
    opacity: 1 !important; 
    visibility: visible !important; 
    filter: none !important; 
  }
  
  [data-animate-blur], .js-img-wrapper, .bg-image { 
    filter: none !important; 
    opacity: 1 !important; 
    visibility: visible !important; 
  }
</style>
  `);

  fs.writeFileSync(file.final, $.html());
  console.log(`Saved ${file.final}`);
}
