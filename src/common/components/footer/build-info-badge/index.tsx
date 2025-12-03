import { getFormattedBuildDate } from './build-info';
import './style.css';
import { Display } from '../../display';
import { Text } from '@common/components/text';

export const BuildInfoBadge = () => {
  return (
    <Display type="flex" gap="05" className="build-info-badge">
      <Text size="xs" className="build-info-badge__version">
        Dernière mise à jour le{' '}
      </Text>
      <Text size="xs" className="build-info-badge__date">
        {getFormattedBuildDate()}
      </Text>
    </Display>
  );
};
