import './style.css';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'plus':
      return 'https://assets-decodeurs.lemonde.fr/redacweb/editorial-design-sys-assets/plus.svg';
    case 'check':
      return 'https://assets-decodeurs.lemonde.fr/redacweb/editorial-design-sys-assets/check.svg';
    case 'close':
      return 'https://assets-decodeurs.lemonde.fr/redacweb/editorial-design-sys-assets/close.svg';
    default:
      return '';
  }
};

type Props = {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'forced-white' | 'error' | 'accent' | 'default' | string;
  className?: string;
};

export const Icon = ({ name, size = 'sm', className = '', color }: Props) => {
  return (
    <img
      src={getIcon(name)}
      className={`lmui-icon lmui-icon--${name} ${className} ${color ? `lmui-icon--${color}` : ''} lmui-icon--${size}`}
    />
  );
};
