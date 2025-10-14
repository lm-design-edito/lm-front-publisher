const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'plus':
      return 'https://assets-decodeurs.lemonde.fr/redacweb/editorial-design-sys-assets/plus.svg';
  }
};

type Props = {
  name: string;
  className?: string;
};

export const Icon = ({ name, className }: Props) => {
  return <img src={getIcon(name)} className={`lmui-icon ${className}`} />;
};
