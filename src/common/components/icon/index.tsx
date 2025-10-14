const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'plus':
      return 'https://assets-decodeurs.lemonde.fr/redacweb/editorial-design-sys-assets/plus.svg';
    case 'check':
      return 'https://assets-decodeurs.lemonde.fr/redacweb/editorial-design-sys-assets/check.svg';
    default:
      return '';
  }
};

type Props = {
  name: string;
  className?: string;
};

export const Icon = ({ name, className }: Props) => {
  return <img src={getIcon(name)} className={`lmui-icon ${className}`} />;
};
