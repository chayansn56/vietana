const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Simple regex to extract image URLs from destinations.ts
const destinationsPath = path.join(__dirname, 'src/data/destinations.ts');
const targetDir = path.join(__dirname, 'public/images/sights');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const content = fs.readFileSync(destinationsPath, 'utf8');

// We need to parse the CITIES array. We can use a simple approach: extract all `id` and `image` pairs from the sights array.
// Example: { id: "hcmc1", name: "Ben Thanh Market", image: "https://..." }
const regex = /id:\s*"([^"]+)",[^}]*image:\s*"([^"]+)"/g;

let matches;
const downloads = [];

while ((matches = regex.exec(content)) !== null) {
  const id = matches[1];
  const url = matches[2];
  if (url.startsWith('http')) {
    downloads.push({ id, url });
  }
}

console.log(`Found ${downloads.length} images to download.`);

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  let updatedContent = content;
  for (const item of downloads) {
    const ext = item.url.split('.').pop().split('?')[0] || 'jpg';
    const cleanExt = ['jpg', 'jpeg', 'png', 'webp', 'JPG'].includes(ext) ? ext.toLowerCase() : 'jpg';
    const filename = `${item.id}.${cleanExt}`;
    const filepath = path.join(targetDir, filename);
    const localUrl = `/images/sights/${filename}`;

    if (!fs.existsSync(filepath)) {
      try {
        console.log(`Downloading ${item.id} from ${item.url}`);
        await downloadImage(item.url, filepath);
        // Delay to prevent 429
        await new Promise(r => setTimeout(r, 800));
      } catch (err) {
        console.error(`Error downloading ${item.id}:`, err.message);
        continue;
      }
    } else {
      console.log(`Already exists: ${filename}`);
    }

    // Replace in file
    updatedContent = updatedContent.replace(item.url, localUrl);
  }

  fs.writeFileSync(destinationsPath, updatedContent, 'utf8');
  console.log('Finished downloading and updating destinations.ts!');
}

run();
