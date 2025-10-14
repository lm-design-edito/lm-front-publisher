import type { DisplayProps } from '.';

export const createDisplayClassNames = (props: DisplayProps) => {
  switch (props.type) {
    case 'grid':
      return [
        'display-grid',
        props.cols ? `display-grid--cols-${props.cols || 3}` : '',
        props.gap ? `display-grid--gap-${props.gap || 0}` : '',
      ].join(' ');
    case 'flex':
      return [
        'display-flex',
        props.direction
          ? `display-flex--direction-${props.direction || 'row'}`
          : '',
        props.justify
          ? `display-flex--justify-${props.justify || 'start'}`
          : '',
        props.align ? `display-flex--align-${props.align || 'start'}` : '',
        props.flex ? `display-flex--flex-${props.flex || 1}` : '',
        props.gap ? `display-flex--gap-${props.gap || 0}` : '',
        props.wrap ? 'display-flex--wrap' : '',
      ].join(' ');
    default:
      return '';
  }
};
