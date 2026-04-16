import puppeteer from 'puppeteer';
import fs from 'fs';

async function scrapeVideos(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Extract all video sources
  const videos = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('video').forEach(vid => {
      let src = vid.src || (vid.querySelector('source') ? vid.querySelector('source').src : '');
      let parent = vid.closest('section');
      let title = parent ? (parent.querySelector('h1, h2, h3, h4, h5, h6') ? parent.querySelector('h1, h2, h3, h4, h5, h6').innerText : '') : '';
      results.push({ src, title });
    });
    return results;
  });

  await browser.close();
  return videos;
}

(async () => {
  const foodVideos = await scrapeVideos('https://www.digitalwebteam.com.br/foodservice');
  console.log('Food Service Videos:', JSON.stringify(foodVideos, null, 2));
  
  const retailVideos = await scrapeVideos('https://www.digitalwebteam.com.br/varejo');
  console.log('Retail Videos:', JSON.stringify(retailVideos, null, 2));

  const accountsVideos = await scrapeVideos('https://www.digitalwebteam.com.br/servicos');
  console.log('Accounts Videos:', JSON.stringify(accountsVideos, null, 2));

  fs.writeFileSync('videos_temp.json', JSON.stringify({ food: foodVideos, retail: retailVideos, accounts: accountsVideos }, null, 2));
})();
