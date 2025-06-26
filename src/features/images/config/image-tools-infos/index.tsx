const ImageGeneratorToolInfos = {
  name: "Générateur de média d'appels",
  description: "Générer des médias d'appels à partir d'une image",
  badge: 'all',
  url: '/images/generator',
  icon: 'icon5.png',
};

const ImageFormatterToolInfos = {
  name: 'Image Formatter',
  description: 'Formatter les images dans différents formats',
  badge: 'image.format',
  url: '/images/formatter',
  icon: 'icon6.png',
};

const ImageToolsInfos = [
  ImageFormatterToolInfos,
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
  ImageGeneratorToolInfos,
];

console.log('ImageToolsInfos', ImageToolsInfos);

export { ImageFormatterToolInfos, ImageGeneratorToolInfos, ImageToolsInfos };
