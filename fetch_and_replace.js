import fs from 'fs';
import https from 'https';

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
        reject(new Error(`Failed to fetch ${page.url}, status code: ${res.statusCode}`));
        return;
      }
      
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let modifiedHtml = data;

        // Comprehensive replacements for branding, tone, and old company footprints
        const replacements = [
          [/digitalwebteam\.com\.br/gi, 'TEMPORARY_DOMAIN_PLACEHOLDER'],
          [/Digital[\s]*Web[\s]*Team/gi, page.newName],
          [/Digital[\s]*Web/gi, page.newName],
          [/Digitalweb/gi, page.newName],
          [/digitalweb/g, page.newName.replace(' ', '').toLowerCase()],
          [/TEMPORARY_DOMAIN_PLACEHOLDER/g, 'digitalwebteam.com.br'],

          // Tone replacements to remove "White Label/Revenda"
          [/Seja revenda/gi, 'Conheça o'],
          [/Seja um parceiro/gi, 'Conheça o nosso sistema'],
          [/Programa de Plataformas/gi, 'Solução Completa'],
          [/modelo Plataforma/gi, 'sistema completo'],
          [/com a sua marca na frente/gi, 'com total tecnologia a seu favor'],
          [/com a sua marca/gi, 'para o seu negócio'],
          [/toda a plataforma é white label/gi, 'toda a plataforma é customizável'],
          [/toda a plataforma é White-Label/gi, 'toda a plataforma é customizável'],
          [/tecnologia white-label/gi, 'tecnologia de ponta'],
          [/tecnologia whitelabel/gi, 'tecnologia inovadora'],
          [/tecnologia white label/gi, 'tecnologia focada no seu negócio'],
          [/White[\s]*Label/gi, 'Inovadora'],
          [/white[\s]*label/gi, 'inovadora'],
          [/Whitelabel/gi, 'Inovadora'],
          [/whitelabel/gi, 'inovadora'],
          [/Revendas/g, 'Clientes'],
          [/revendas/g, 'clientes'],
          [/Revenda/g, 'Sistema'],
          [/revenda/g, 'sistema'],
          [/Revendedor/gi, 'Cliente'],
          [/revendedor/gi, 'cliente'],
          [/backbone tecnológico para a sua marca/gi, 'backbone tecnológico para a sua empresa'],
          [/expandir sua oferta/gi, 'potencializar seu negócio'],
          [/sua marca/gi, 'sua empresa'],
          [/parceria/gi, 'solução tecnológica'],
          [/Atenciosamente, DIGITALWEB[\s]*/gi, '']
        ];

        for (const [pattern, replacement] of replacements) {
          modifiedHtml = modifiedHtml.replace(pattern, replacement);
        }

        // 1. Add base href tag
        modifiedHtml = modifiedHtml.replace(
          /<head>/i,
          '<head>\n<base href="https://www.digitalwebteam.com.br/">'
        );

        // 2. Inject CSS to hide footer and headers and anything referring to the old site's layout frame
        const extraCSS = `
<style>
  #SITE_HEADER, #SITE_FOOTER, header, footer { display: none !important; }
</style>`;
        
        modifiedHtml = modifiedHtml.replace(/<\/head>/i, `${extraCSS}\n</head>`);
        
        fs.writeFileSync(page.filename, modifiedHtml);
        console.log(`Saved ${page.filename} with brand ${page.newName}`);
        resolve();
      });
    }).on('error', (err) => reject(err));
  });
}

async function main() {
  console.log('Starting fetch_and_replace...');
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
