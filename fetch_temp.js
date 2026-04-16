import https from 'https';
import fs from 'fs';

https.get('https://www.digitalwebteam.com.br/foodservice', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    fs.writeFileSync('temp_food.html', data);
    console.log('Saved to temp_food.html');
  });
});
