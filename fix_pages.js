import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

const pages = [
  'public/foodservice-content.html',
  'public/varejo-content.html',
  'public/servicos-content.html'
];

const baseUrl = 'https://www.digitalwebteam.com.br';

function toAbsolute(url) {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return baseUrl + url;
  return baseUrl + '/' + url;
}

function replaceText(text) {
  if (!text) return text;
  let newText = text;
  newText = newText.replace(/Seja revenda QRZ/gi, 'Solução QRZ');
  newText = newText.replace(/Seja revenda Digitalweb — tecnologia/gi, 'Tecnologia');
  newText = newText.replace(/faturando no modelo whitelabel/gi, 'utilizando nossa tecnologia');
  newText = newText.replace(/modelo whitelabel/gi, 'tecnologia completa');
  newText = newText.replace(/whitelabel/gi, 'solução completa');
  newText = newText.replace(/white label/gi, 'solução completa');
  newText = newText.replace(/Seja revenda/gi, 'Seja cliente');
  // Match 'revenda' or 'revendas' globally, taking punctuation into account
  newText = newText.replace(/\\b(revendas?)\\b/gi, 'empresas');
  newText = newText.replace(/sua empresa/gi, 'seu negócio'); // some minor copy tuning
  newText = newText.replace(/Você \\(empresas\\) cuida de:/gi, 'Controle da Operação:');
  newText = newText.replace(/Você \\([a-zA-Z]+\\) cuida de:/gi, 'Controle da Operação:');
  
  // Custom manual fixes based on grep
  newText = newText.replace(/Controle total para empresas/gi, 'Controle total da sua operação');
  newText = newText.replace(/empresas exclusivas/gi, 'clientes exclusivos');
  newText = newText.replace(/suporte exclusivo à sua empresas/gi, 'suporte exclusivo ao seu negócio');
  newText = newText.replace(/apenas para a empresas/gi, 'para o seu negócio');
  
  return newText;
}

function replaceTextNodes(node) {
  if (node.type === 'text' && node.data) {
    node.data = replaceText(node.data);
  } else if (node.children) {
    node.children.forEach(replaceTextNodes);
  }
}

async function fixHtmlFile(filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);

    // 1. Remove Headers and Menus
    $('header').remove();
    $('nav').remove();
    $('[data-elementor-type="header"]').remove();
    $('.elementor-location-header').remove();
    $('[role="navigation"]').remove();
    $('[data-elementor-type="footer"]').remove();
    $('.elementor-location-footer').remove();


    // 2. Fix Text and Copy (whitelabel -> produto para empresa final)
    replaceTextNodes($('body')[0]);

    // Apply to meta tags
    $('title, meta').each((i, el) => {
      const content = $(el).attr('content');
      if (content) {
        $(el).attr('content', replaceText(content));
      }
      if (el.name === 'title') {
        replaceTextNodes(el);
      }
    });

    // 3. Fix Images & Videos links
    
    // Fix src attributes
    $('[src]').each((i, el) => {
      const src = $(el).attr('src');
      if (src) $(el).attr('src', toAbsolute(src));
    });

    // Fix data-src (lazy loaded)
    $('[data-src]').each((i, el) => {
      const dsrc = $(el).attr('data-src');
      if (dsrc) $(el).attr('data-src', toAbsolute(dsrc));
    });

    // Fix srcset attributes
    $('[srcset]').each((i, el) => {
      const srcset = $(el).attr('srcset');
      if (srcset) {
        const parts = srcset.split(',').map(part => {
          const trimmed = part.trim();
          const spaceIdx = trimmed.indexOf(' ');
          if (spaceIdx === -1) return toAbsolute(trimmed);
          const url = trimmed.slice(0, spaceIdx);
          const size = trimmed.slice(spaceIdx + 1);
          return toAbsolute(url) + ' ' + size;
        });
        $(el).attr('srcset', parts.join(', '));
      }
    });

    // Fix inline styles with url()
    $('[style]').each((i, el) => {
      const style = $(el).attr('style');
      // If there are CSS variables containing URLs, etc.
      if (style && style.includes('url(')) {
        const newStyle = style.replace(/url\((['"]?)(.*?)\1\)/gi, (match, quote, url) => {
            return `url(${quote}${toAbsolute(url)}${quote})`;
        });
        $(el).attr('style', newStyle);
      }
    });

    fs.writeFileSync(filePath, $.html());
    console.log(`Successfully processed ${filePath}`);
    
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

pages.forEach(file => {
  const fullPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    fixHtmlFile(fullPath);
  } else {
    console.warn(`File not found: ${fullPath}`);
  }
});
