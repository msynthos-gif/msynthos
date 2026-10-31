const sharp = require('sharp');
const path = require('path');

const srcDir = 'C:/Users/SAIFULLAH/.gemini/antigravity-ide/brain/b9fc98d3-e9f0-4a89-ac16-c56e1c462f21';
const destDir = path.join(__dirname, '../src/assets');

async function convertBanner() {
  await sharp(path.join(srcDir, 'pakistan_office_collaboration_1786967618769.jpg'))
    .resize(1440, 810, { fit: 'cover' })
    .webp({ quality: 85, effort: 6 })
    .toFile(path.join(destDir, 'contact_collaboration_banner.webp'));
  console.log('Converted Pakistani office collaboration banner to webp');
}

convertBanner().catch(console.error);
