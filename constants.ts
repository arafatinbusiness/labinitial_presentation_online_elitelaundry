import type { Slide } from './types';
import { SlideType } from './types';

/*
 * IMPORTANT:
 * The `src` properties below are placeholders.
 * To use your own files, create a `public/assets` directory in your project,
 * place your images and videos there, and then update the `src` paths to
 * something like `/assets/1_home.png`.
*/

const fileList = [
  '1_home.png',
  '2_login.png',
  '3_login_form.png',
  '4_dashboard.png',
  '5_pos1big.png',
  '6.png',
  '7_invoice.png',
  '8.png',
  '9_geomap.png',
  'eBalance_system.png',
  'pos main.png',
  'ScannerPay.png',
  'Presentation_video_1.mp4',
];

export const SLIDES: Slide[] = fileList.map((file, index) => {
  const isVideo = file.endsWith('.mp4');
  const name = file.replace(/\.(png|mp4|jpg|jpeg)$/, '').replace(/_/g, ' ');

  const slide: Slide = {
    id: `slide-${index}-${name.replace(' ', '-')}`,
    name: name,
    type: isVideo ? SlideType.VIDEO : SlideType.IMAGE,
    src: `/assets/${file}`, // Use local media files
  };

  if (slide.type === SlideType.IMAGE) {
    slide.placeholderSrc = `/assets/${file}`; // Use same image for placeholder
  }

  return slide;
});
