import fs from 'fs';
import path from 'path';
import url from 'url';

// Load .env if present
let dotenvLoaded = false;
try {
  const { config } = await import('dotenv');
  config();
  dotenvLoaded = true;
} catch {
  // dotenv not installed yet; script can still run if env is set
}

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicAssets = path.join(projectRoot, 'public', 'assets');
const outFile = path.join(publicAssets, 'config.json');

const NEWS_API_KEY = process.env.NEWS_API_KEY || '';
const NEWS_API_BASE = 'https://newsapi.org/v2';

if (!fs.existsSync(publicAssets)) {
  fs.mkdirSync(publicAssets, { recursive: true });
}

const configJson = {
  newsApiKey: NEWS_API_KEY,
  newsApiBase: NEWS_API_BASE
};

fs.writeFileSync(outFile, JSON.stringify(configJson, null, 2), 'utf-8');

console.log(`Runtime config generated at ${path.relative(projectRoot, outFile)}`);
if (!NEWS_API_KEY) {
  console.warn('WARNING: NEWS_API_KEY is empty. Set it in .env before starting.');
}