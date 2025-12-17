import { Display } from '@common/components/display';
import { Text } from '@common/components/text';
import './style.css';

export type GradientPreviewProps = {
  angle?: number;
  type?: 'linear' | 'radial';
  startColor?: string;
  stopColor?: string;
};

export const GradientPreview = ({
  angle = 90,
  type = 'linear',
  startColor = '#000',
  stopColor = '#fff',
}: GradientPreviewProps) => {
  return (
    <Display
      type="flex"
      align="center"
      justify="end"
      className="gradient-preview"
    >
      <Text>Aperçu du gradient</Text>
      <div
        className="gradient-preview__box"
        style={{
          background:
            type === 'linear'
              ? `linear-gradient(${angle}deg, ${startColor}, ${stopColor}) `
              : `radial-gradient(50% 75% at 50% 50%, ${startColor} 0%, ${stopColor} 100%)`,
        }}
      ></div>
    </Display>
  );
};
