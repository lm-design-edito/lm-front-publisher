import { Display } from '../display';
import { BuildInfoBadge } from '../footer/build-info-badge';
import { Text } from '../text';
import './style.css';

export function Footer() {
  return (
    <footer className="footer">
      <Display type="inline-flex" justify="center" align="center" gap="05">
        <Text size="xs">LM Publisher -</Text>
        <BuildInfoBadge />
      </Display>
    </footer>
  );
}
