import { Display } from '@common/components/display';
import { Text } from '@common/components/text';
import './style.css';

export type GradientPreviewProps = {
  angle?: number;
  startColor?: string;
  stopColor?: string;
};

export const GradientPreview = ({
  angle = 90,
  startColor = '#000',
  stopColor = '#ffffff00',
}: GradientPreviewProps) => {
  return (
    <Display type="flex" align="center" className="gradient-preview">
      <Text>Aperçu du gradient</Text>
      <div
        className="gradient-preview__box"
        style={{
          background: `linear-gradient(${angle}deg, ${startColor}, ${stopColor})`,
        }}
      ></div>
    </Display>
  );
};
