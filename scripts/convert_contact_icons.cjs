const sharp = require('sharp');
const path = require('path');

const srcDir = 'C:/Users/SAIFULLAH/.gemini/antigravity-ide/brain/b9fc98d3-e9f0-4a89-ac16-c56e1c462f21';
const destDir = path.join(__dirname, '../src/assets');

async function convertIcons() {
  await sharp(path.join(srcDir, 'contact_email_visual_1786965992724.jpg'))
    .resize(256, 256, { fit: 'cover' })
    .webp({ quality: 88, effort: 6 })
    .toFile(path.join(destDir, 'contact_email_icon.webp'));
  console.log('Converted contact email icon to webp');

  await sharp(path.join(srcDir, 'contact_whatsapp_visual_1786966014342.jpg'))
    .resize(256, 256, { fit: 'cover' })
    .webp({ quality: 88, effort: 6 })
    .toFile(path.join(destDir, 'contact_whatsapp_icon.webp'));
  console.log('Converted contact whatsapp icon to webp');
}

convertIcons().catch(console.error);
