import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

const files = [
  { in: 'public/foodservice-content.html', out: 'public/page-food.html', brand: 'QRZ Food', type: 'food' },
  { in: 'public/varejo-content.html', out: 'public/page-varejo.html', brand: 'QRZ Store', type: 'retail' },
  { in: 'public/servicos-content.html', out: 'public/page-serv.html', brand: 'QRZ Inv', type: 'accounts' }
];

let videosData = {};
if (fs.existsSync('videos_temp_scraped.json')) {
    videosData = JSON.parse(fs.readFileSync('videos_temp_scraped.json', 'utf8'));
}

for (const file of files) {
  if (!fs.existsSync(file.in)) {
      console.log(`Input file ${file.in} not found, skipping...`);
      continue;
  }
  let html = fs.readFileSync(file.in, 'utf8');
  const $ = cheerio.load(html);

  // 1. CLEANUP HEAD
  $('script').remove(); // Strip ALL JS for stability
  $('head base').remove(); // Remove old base tags
  $('head').prepend('<meta name="referrer" content="no-referrer">');
  $('head').prepend('<base href="https://www.digitalwebteam.com.br/">');

  // 2. SURGICAL REMOVALS (The 5 items + others)
  const textsToRemove = [
    "Liberdade: você mesmo cria as licenças",
    "Ativação: Bloqueie ou cancele maus pagadores",
    "Suporte: Diversos videos para dúvida básicas",
    "Seu clientes: Aponte seu dominio",
    "Seu cliente: Aponte seu dominio",
    "Seus clientes: Aponte seu dominio",
    "Branding/Solução Completa: Seu logotipo aparece",
    "Branding/White Label: Seu logotipo",
    "Branding/Solução inovadora: Seu logotipo",
    "O valor da licença de sistema é reajustado",
    "Ajustamos 1x ao ano",
    "Como funciona na prática ?",
    "⚡ Para quem é este programa",
    "Para quem é este programa",
    "Este programa é voltado para",
    "que desejam potencializar seu negócio",
    "empresas e profissionais do setor de automação",
    "automação comercial que desejam",
    "Diversas clientes faturando",
    "Diversas revendas faturando",
    "Controle total para clientes",
    "Controle total para empresas",
    "Controle total para revendas",
    "sistema exclusivo (Solução Completa): seu logo",
    "marca própria (White Label): seu logo",
    "Receita recorrente: planos e serviços"
  ];

  $('span, p, h1, h2, h3, h4, li, div').each((i, el) => {
    const section = $(el);
    const text = section.text().trim().replace(/\s+/g, ' ');
    
    // Check for item removals
    for (const target of textsToRemove) {
      if (text.includes(target)) {
        // Branding Image Swap: Find any reasonably sized image in the same section OR the next section
        let parentSection = $(el).closest('section');
        if (!parentSection.length) parentSection = $(el).parents('div[data-testid="mesh-container-content"]').first();
        
        if (parentSection.length) {
            let foundImg = false;
            parentSection.find('img').each((idx, imgEl) => {
                $(imgEl).attr('src', 'https://images.unsplash.com/photo-1556740734-7bab0615e478?auto=format&fit=crop&q=80&w=1200');
                $(imgEl).removeAttr('srcset');
                $(imgEl).attr('style', 'opacity:1 !important; visibility:visible !important; display:block !important; object-fit:cover !important;');
                foundImg = true;
            });
            // If not found in current section, check the next one (sometimes Wix splits them)
            if (!foundImg) {
                parentSection.next('section').find('img').first().attr('src', 'https://images.unsplash.com/photo-1556740734-7bab0615e478?auto=format&fit=crop&q=80&w=1200');
            }
        }
        
        let toRemove = $(el).closest('li');
        if (!toRemove.length) toRemove = $(el).closest('p');
        
        // Only remove if it's a reasonably sized leaf element
        if (toRemove.length && toRemove.text().length < 600) {
            toRemove.remove();
        } else if (section.is('span, h1, h2, h3, h4, li') && section.text().length < 600) {
            section.remove();
        } else if (section.text().length < 600) {
            // Last resort for small divs
            section.remove();
        }
        break; 
      }
    }
  });

  // 3. PREMIUM FAQ RE-FORMATTING
  const faqData = [
    {
      q: 'O que é o modelo Solução Completa?',
      newQ: 'O que é a Solução Completa da QRZ?',
      a: 'Uma plataforma tecnológica completa para o seu negócio. Você utiliza a nossa tecnologia, infraestrutura e suporte especializado para gerenciar sua operação de ponta a ponta.'
    },
    {
      q: 'Preciso de equipe de desenvolvimento própria?',
      newQ: 'Preciso de equipe de TI própria?',
      a: 'Não. Você foca em atender seus clientes e gerenciar seu negócio. Nós cuidamos da tecnologia, atualizações e inovação.'
    },
    {
      q: 'Quais módulos posso oferecer?',
      newQ: 'Quais módulos estão inclusos no sistema?',
      a: 'ERP, PDV (Windows/Android/SmartPOS), Autoatendimento, KDS, Cardápio Digital e integrações (iFood, aplicativos de entrega, TEF/SiTEF, balanças, etiquetas e mais).'
    },
    {
      q: 'O sistema funciona offline?',
      newQ: 'O sistema funciona offline?',
      a: 'Sim. O PDV opera on/offline e sincroniza com a nuvem quando a conexão retorna.'
    },
    {
        q: 'Posso começar por um segmento específico?',
        newQ: 'O sistema atende quais tipos de estabelecimentos?',
        a: 'Nossa solução atende perfeitamente o setor de foodservice, varejo, prestação de serviços e eventos, adaptando-se às suas necessidades.'
    },
    {
        q: 'Ainda tem dúvidas?',
        newQ: 'Ainda tem dúvidas?',
        a: 'Chame-nos no WhatsApp clicando no botão do lado direito inferior para falar com um atendente.'
    }
  ];

  $('span, p, h4, li').each((i, el) => {
    let h = $(el).html() || '';
    for (const item of faqData) {
      if (h.includes(item.q)) {
        $(el).html(`
          <div style="background: #ffffff; padding: 20px; border-radius: 12px; margin-bottom: 16px; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
            <div style="color: #111827; font-weight: 700; margin-bottom: 8px; font-size: 1.1rem;">Pergunta: ${item.newQ}</div>
            <div style="color: #4B5563; line-height: 1.6; font-weight: 400;">Resposta: ${item.a}</div>
          </div>
        `);
        break;
      }
    }
  });

  // 4. IMAGE & VIDEO PRESERVATION / FIXING
  const pageVideos = videosData[file.type] || [];
  let videoIndex = 0;
  $('.VideoPlayer2054936319__root').each((i, el) => {
    $(el).empty(); 
    const vidSrc = (videoIndex < pageVideos.length) ? pageVideos[videoIndex].src : 'https://video.wixstatic.com/video/6bae68_8e14a52c77264505b2b4fae4de238400/480p/mp4/file.mp4';
    $(el).append(`<video src="${vidSrc}" controls style="width: 100%; height: 100%; min-height: 250px; object-fit: cover; border-radius: 8px;"></video>`);
    videoIndex++;
  });

  // Force actual SRCs from Wix lazyload
  $('img').each((i, el) => {
    const $img = $(el);
    let src = $img.attr('src');
    if (!src || src.startsWith('data:image')) {
      const srcset = $img.attr('srcset');
      const dataSrc = $img.attr('data-src');
      if (srcset) {
        $img.attr('src', srcset.split(',')[0].split(' ')[0]);
      } else if (dataSrc) {
        $img.attr('src', dataSrc);
      }
    }
  });

  // 5. FINAL BRAND PURGE (Search and Replace except for sensitive tags like base href)
  const brandReplacements = [
    [/Digital[\s]?Web[\s]?Team/gi, file.brand],
    [/Digitalweb/gi, file.brand],
    [/digitalweb/gi, 'qrz'],
    [/White[\s]?Label/gi, 'Solução Completa'],
    [/Whitelabel/gi, 'Solução completa'],
    [/Revenda/gi, 'Sistema'],
    [/Revendedor/gi, 'Parceiro'],
    [/marca própria/gi, 'sistema exclusivo']
  ];

  // We operate on the DOM for text rebranding to avoid hitting attribute URLs like base href
  $('*').each((i, el) => {
    if (['script', 'style', 'base', 'link'].includes(el.tagName)) return;
    
    // Rebrand text nodes
    $(el).contents().each((ci, node) => {
        if (node.nodeType === 3) { // Text node
            let text = $(node).text();
            for (const [reg, rep] of brandReplacements) {
                text = text.replace(reg, rep);
            }
            $(node).replaceWith(text);
        }
    });

    // Rebrand common attributes
    ['alt', 'title', 'placeholder'].forEach(attr => {
        const val = $(el).attr(attr);
        if (val) {
            let newVal = val;
            for (const [reg, rep] of brandReplacements) {
                newVal = newVal.replace(reg, rep);
            }
            $(el).attr(attr, newVal);
        }
    });
  });

  let finalHtml = $.html();

  // 6. INJECT PREMIUM CSS
  const final$ = cheerio.load(finalHtml);
  final$('head').append(`
    <style id="qrz-clean-ui">
      #SITE_HEADER, #SITE_FOOTER, header, footer, [data-testid="header"], [data-testid="footer"] { display: none !important; }
      body {
        background-color: #f9fafb !important;
        font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        color: #1f2937 !important;
        margin: 0; padding: 0;
      }
      section { padding: 40px 20px !important; }
      img, video { border-radius: 12px !important; max-width: 100%; height: auto; }
      h1, h2, h3, h4 { color: #111827 !important; }
      
      /* Force visibility for Wix elements that are hidden waiting for JS */
      #site-root, [data-hide-prejs], [data-testid], .wixui-image, .bg-image, .style-id-prejs { 
        opacity: 1 !important; 
        visibility: visible !important; 
        display: block !important; 
      }
      
      /* Ensure mesh layout works without JS */
      .mesh-layout { display: block !important; }
    </style>
  `);

  fs.writeFileSync(file.out, final$.html(), 'utf8');
  console.log(`Successfully generated ${file.out}`);
}
console.log("Transformation Complete.");
