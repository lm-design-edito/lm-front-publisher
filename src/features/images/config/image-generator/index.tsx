const ImageGeneratorTemplates = [
  { name: 'lines', label: 'Livres', attributes: ['checked'] },
  { name: 'tiles', label: 'Tuiles' },
  { name: 'white-filter', label: 'Filtre blanc' },
  { name: 'gradient-pink-filter', label: 'Filtre rose dégradé' },
  { name: 'pattern', label: 'Trame' },
  { name: 'logo-LM', label: 'Logo LeMonde centré' },
];

const ImageGeneratorConfigTemplates: Record<string, unknown> = {
  lines: {
    inputOperations: [
      {
        name: 'frame',
        params: {
          dimensions: {
            widthPx: 1348,
            heightPx: 640,
          },
          imageScale: {
            xRatio: 0.5,
            yRatio: 0.5,
          },
          positions: {
            left: '50%',
            top: '50%',
            translateX: '-50%',
            translateY: '-50%',
          },
          background: {
            type: 'line',
            colorPalette: {
              extract: {
                nbColor: 5,
              },
              densify: {
                types: ['default'],
              },
            },
            params: {
              nbLines: 11,
              colors: {
                selectColorPaletteIndex: 2,
                primaryTransformations: [
                  {
                    type: 'saturate',
                    intensity: 95,
                    intensityMode: 'set',
                  },
                ],
                secondaryTransformations: [
                  {
                    type: 'saturate',
                    intensity: 95,
                    intensityMode: 'set',
                  },
                  {
                    type: 'lighten',
                    intensity: 20,
                    intensityMode: 'add',
                  },
                ],
              },
            },
          },
        },
      },
    ],
    checkValidOperations: true,
    qualities: [100],
    widths: [920],
    heights: [640],
    formats: ['png'],
  },
  tiles: {
    inputOperations: [
      {
        name: 'frame',
        params: {
          dimensions: {
            widthPx: 1348,
            heightPx: 640,
          },
          imageScale: {
            xRatio: 0.7,
            yRatio: 0.9,
          },
          positions: {
            left: '50%',
            top: 0,
            translateX: '-50%',
          },
          // background: { r: 200, g: 200, b: 200, alpha: 50 },
          background: {
            type: 'tile',
            colorPalette: {
              extract: {
                nbColor: 5,
              },
              densify: {
                types: ['default', 'default-lighten', 'default-saturate'],
                ligthenIntensity: 10,
                saturateIntensity: 20,
              },
              compose: {
                nbColor: 10,
                mix: true,
              },
            },
            params: {
              coverageRatio: 1,
              densityA: { min: 1, max: 2 },
              densityB: { min: 1, max: 2 },
              format: 'random',
              xEasing: 'ease-in-quad',
              yEasing: 'ease-in-out-quad',
            },
          },
        },
      },
    ],
    checkValidOperations: true,
    qualities: [100],
    widths: [920],
    heights: [640],
    formats: ['png'],
  },
  'white-filter': {
    inputOperations: [
      {
        name: 'compose',
        params: {
          images: [
            {
              input: {
                mode: 'fill',
                nbChannels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 0.5 },
              },
              positions: {
                left: 0,
                top: 0,
              },
            },
          ],
        },
      },
    ],
    checkValidOperations: true,
    qualities: [100],
    widths: [920],
    heights: [640],
    formats: ['png'],
  },
  'gradient-pink-filter': {
    inputOperations: [
      {
        name: 'compose',
        params: {
          images: [
            {
              input: {
                mode: 'gradient',
                angleDeg: 45,
                colorStops: [
                  {
                    color: { r: 255, g: 255, b: 255, alpha: 0 },
                    offsetPercent: 30,
                  },
                  {
                    color: { r: 255, g: 87, b: 186, alpha: 0.5 },
                    offsetPercent: 80,
                  },
                ],
              },
              positions: {
                left: 0,
                top: 0,
              },
            },
          ],
        },
      },
    ],
    checkValidOperations: true,
    qualities: [100],
    widths: [920],
    heights: [640],
    formats: ['png'],
  },
};

export { ImageGeneratorTemplates, ImageGeneratorConfigTemplates };
