import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function createIcon(size, isMaskable = false) {
  const png = new PNG({ width: size, height: size });
  const center = size / 2;
  const radius = size * 0.44;
  const badgeRadius = isMaskable ? size * 0.35 : radius;

  // Background and colors
  // Emerald primary: [16, 185, 129]
  // Dark emerald: [5, 150, 105]
  // White: [255, 255, 255]
  // Amber: [245, 158, 11]

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (isMaskable) {
        // Full bleed background for maskable
        png.data[idx] = 5;     // R
        png.data[idx + 1] = 150; // G
        png.data[idx + 2] = 105; // B
        png.data[idx + 3] = 255; // A
      } else {
        // Rounded squircle / circle background
        const cornerDist = Math.max(Math.abs(dx), Math.abs(dy));
        if (cornerDist < size * 0.46) {
          const t = y / size;
          png.data[idx] = Math.round(16 * (1 - t) + 4 * t);
          png.data[idx + 1] = Math.round(185 * (1 - t) + 120 * t);
          png.data[idx + 2] = Math.round(129 * (1 - t) + 87 * t);
          png.data[idx + 3] = 255;
        } else {
          png.data[idx + 3] = 0; // transparent outside
        }
      }

      // Inner white shield area
      if (Math.abs(dx) < badgeRadius * 0.82 && Math.abs(dy) < badgeRadius * 0.82) {
        png.data[idx] = 255;
        png.data[idx + 1] = 255;
        png.data[idx + 2] = 255;
        png.data[idx + 3] = 255;
      }

      // Draw "R" and "U" block letters in emerald inside
      // Central band
      const relX = dx / size;
      const relY = dy / size;

      // Draw owl eyes accent
      const leftEyeDist = Math.hypot(x - size * 0.4, y - size * 0.42);
      const rightEyeDist = Math.hypot(x - size * 0.6, y - size * 0.42);
      const eyeR = size * 0.08;

      if (leftEyeDist < eyeR || rightEyeDist < eyeR) {
        png.data[idx] = 16;
        png.data[idx + 1] = 185;
        png.data[idx + 2] = 129;
        png.data[idx + 3] = 255;
      }

      const innerEyeR = size * 0.045;
      if (leftEyeDist < innerEyeR || rightEyeDist < innerEyeR) {
        png.data[idx] = 15;
        png.data[idx + 1] = 23;
        png.data[idx + 2] = 42;
        png.data[idx + 3] = 255;
      }

      // Beak
      if (Math.abs(dx) < size * 0.04 && dy > size * -0.02 && dy < size * 0.06) {
        png.data[idx] = 245;
        png.data[idx + 1] = 158;
        png.data[idx + 2] = 11;
        png.data[idx + 3] = 255;
      }

      // "RU" badge ribbon at bottom of shield
      if (Math.abs(dx) < size * 0.22 && dy > size * 0.12 && dy < size * 0.26) {
        png.data[idx] = 5;
        png.data[idx + 1] = 150;
        png.data[idx + 2] = 105;
        png.data[idx + 3] = 255;
      }
    }
  }

  return png;
}

const targets = [
  { file: 'pwa-192x192.png', size: 192, maskable: false },
  { file: 'pwa-512x512.png', size: 512, maskable: false },
  { file: 'apple-touch-icon.png', size: 180, maskable: false },
  { file: 'pwa-maskable-512x512.png', size: 512, maskable: true },
];

for (const target of targets) {
  const png = createIcon(target.size, target.maskable);
  const filePath = path.join(publicDir, target.file);
  const buffer = PNG.sync.write(png);
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated ${target.file} (${target.size}x${target.size})`);
}
