import puppeteer from 'puppeteer';
import fs from 'fs';

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

async function scrapeVideos(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Intercepting network requests might also be a good way to find .mp4 or .webm files, but evaluating after scroll is easiest
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Scroll to bottom to trigger lazy loading of videos
  await autoScroll(page);
  // Wait a little bit extra for Wix to mount the video players
  await new Promise(r => setTimeout(r, 2000));

  // Extract all video sources
  const videos = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('video').forEach(vid => {
      let src = vid.src;
      if (!src && vid.querySelector('source')) {
          src = vid.querySelector('source').src;
      }
      
      let parent = vid.closest('section');
      if (!parent) parent = vid.closest('div[data-mesh-id]');
      if (!parent) parent = vid.closest('div[id^="comp-"]');
      
      let title = '';
      if (parent) {
         let heading = parent.querySelector('h1, h2, h3, h4, h5, h6');
         if (heading) title = heading.innerText;
      }
      
      // Look for aria-label on the player root
      let playerRoot = vid.closest('.VideoPlayer2054936319__root');
      let ariaLabel = playerRoot ? playerRoot.getAttribute('aria-label') : '';

      results.push({ src, title, ariaLabel });
    });
    return results;
  });

  await browser.close();
  return videos;
}

(async () => {
  console.log('Scraping FoodService...');
  const foodVideos = await scrapeVideos('https://www.digitalwebteam.com.br/foodservice');
  console.log('Food Service Videos:', JSON.stringify(foodVideos, null, 2));
  
  console.log('Scraping Varejo...');
  const retailVideos = await scrapeVideos('https://www.digitalwebteam.com.br/varejo');
  
  console.log('Scraping Servicos...');
  const accountsVideos = await scrapeVideos('https://www.digitalwebteam.com.br/servicos');

  const output = { food: foodVideos, retail: retailVideos, accounts: accountsVideos };
  fs.writeFileSync('videos_temp_scraped.json', JSON.stringify(output, null, 2));
  console.log('Scraping completed');
})();
