const sharp = require('sharp');
const path = require('path');

const srcDir = 'C:/Users/SAIFULLAH/.gemini/antigravity-ide/brain/34f17645-23a5-4a0b-b5d0-b6a114fbeb71';
const destDir = path.join(__dirname, '../src/assets');

async function convertAll() {
  await sharp(path.join(srcDir, 'restaurant_clean_mockup_1786963988681.jpg'))
    .webp({ quality: 85 })
    .toFile(path.join(destDir, 'hero_mockup_restaurant.webp'));
  console.log('1/4 Converted restaurant mockup to webp');

  await sharp(path.join(srcDir, 'workshop_clean_mockup_1786964020544.jpg'))
    .webp({ quality: 85 })
    .toFile(path.join(destDir, 'hero_mockup_workshop.webp'));
  console.log('2/4 Converted workshop mockup to webp');

  await sharp(path.join(srcDir, 'real_estate_mockup_1786963932562.jpg'))
    .webp({ quality: 85 })
    .toFile(path.join(destDir, 'hero_mockup_realestate.webp'));
  console.log('3/4 Converted real estate mockup to webp');

  await sharp(path.join(srcDir, 'fitness_mockup_1786963959040.jpg'))
    .webp({ quality: 85 })
    .toFile(path.join(destDir, 'hero_mockup_fitness.webp'));
  console.log('4/4 Converted fitness mockup to webp');
}

convertAll().catch(console.error);
