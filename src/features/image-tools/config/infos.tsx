import { ImageGeneratorInfos } from '@features/image-tools/generator/config/infos';
import { ImageFormatInfos } from '@features/image-tools/format/config/infos';

const ImageToolsInfos = [
  ImageFormatInfos,
  {
    name: 'Image Resizer',
    description: 'Redimensionner les images selon les besoins',
    // badge: 'image.resize',
    badge: 'all',
    url: '/images/resizer',
    icon: 'icon2.png',
    disabled: true,
  },
  {
    name: 'Image Cropper',
    description: 'Recadrer les images pour un meilleur ajustement',
    // badge: 'image.crop',
    badge: 'all',
    url: '/images/cropper',
    icon: 'icon3.png',
    disabled: true,
  },
  {
    name: 'Image Compressor',
    description: 'Compresser les images pour réduire la taille du fichier',
    // badge: 'image.compress',
    badge: 'all',
    url: '/images/compressor',
    icon: 'icon4.png',
    disabled: true,
  },
  ImageGeneratorInfos,
];

export { ImageToolsInfos };
