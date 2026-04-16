import fs from 'fs';
import https from 'https';
import * as cheerio from 'cheerio';

const pages = [
  {
    url: 'https://www.digitalwebteam.com.br/foodservice',
    newName: 'QRZ Food',
    filename: 'public/foodservice-content.html'
  },
  {
    url: 'https://www.digitalwebteam.com.br/varejo',
    newName: 'QRZ Store',
    filename: 'public/varejo-content.html'
  },
  {
    url: 'https://www.digitalwebteam.com.br/servicos',
    newName: 'QRZ Inv',
    filename: 'public/servicos-content.html'
  }
];

async function fetchAndReplace(page) {
  return new Promise((resolve, reject) => {
    https.get(page.url, (res) => {
      if (res.statusCode !== 200 && res.statusCode !== 301 && res.statusCode !== 302) {
        // Fallback to local if online fails
        if (fs.existsSync(page.filename)) {
          processHtml(fs.readFileSync(page.filename, 'utf8'), page);
          resolve();
        } else {
          reject(new Error(`Fetch failed and no local file`));
        }
        return;
      }
      
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        processHtml(data, page);
        resolve();
      });
    }).on('error', (err) => {
      // Fallback
      if (fs.existsSync(page.filename)) {
        processHtml(fs.readFileSync(page.filename, 'utf8'), page);
        resolve();
      } else {
        reject(err);
      }
    });
  });
}

function processHtml(data, page) {
  let modifiedHtml = data;

  const replacements = [
    [/digitalwebteam\.com\.br/gi, 'TEMPORARY_DOMAIN_PLACEHOLDER'],
    [/Digital[\s]*Web[\s]*Team/gi, page.newName],
    [/Digital[\s]*Web/gi, page.newName],
    [/Digitalweb/gi, page.newName],
    [/digitalweb/g, page.newName.replace(' ', '').toLowerCase()],
    [/TEMPORARY_DOMAIN_PLACEHOLDER/g, 'digitalwebteam.com.br'],
    [/Soluveo/gi, 'QRZ'], // Eradicate legacy ERP branding
    
    // Exact White Label / Revenda eradication
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
    [/Atenciosamente, DIGITALWEB[\s]*/gi, '']
  ];

  for (const [pattern, replacement] of replacements) {
    modifiedHtml = modifiedHtml.replace(pattern, replacement);
  }

  const $ = cheerio.load(modifiedHtml);

  // STRIP ALL JS. This permanently prevents Wix from hydrating the old content.
  $('script').remove();

  // NUCLEAR FIX FOR IMAGES: Wait, what if wix wrapped images are hidden in CSS?
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

  // Inject CSS to forcefully reveal all imagery and hide Wix wrappers/footers
  $('head').prepend('<base href="https://www.digitalwebteam.com.br/">');
  $('head').append(`
<style>
  #SITE_HEADER, #SITE_FOOTER, header, footer { display: none !important; }
  
  /* Force all images and their parents to be fully visible! */
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

  fs.writeFileSync(page.filename, $.html());
  console.log(`Saved ${page.filename} with brand ${page.newName}`);
}

async function main() {
  console.log('Starting final fetch_and_replace...');
  for (const page of pages) {
    console.log(`Fetching ${page.url}...`);
    try {
      await fetchAndReplace(page);
    } catch (e) {
      console.error(e);
    }
  }
  console.log('Done!');
}

main();
