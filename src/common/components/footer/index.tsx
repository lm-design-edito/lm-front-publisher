import { useSyncHeightToCSSVar } from '@common/hooks/useSyncHeightToCSSVar';
import { Display } from '../display';
import { BuildInfoBadge } from '../footer/build-info-badge';
import { Text } from '../text';
import './style.css';
import { useRef } from 'react';

export function Footer() {
  const $footerRef = useRef<HTMLDivElement>(null);
  useSyncHeightToCSSVar({
    target: $footerRef,
    cssPropertyName: '--lm-publisher-footer-height',
  });

  return (
    <footer className="footer" ref={$footerRef}>
      <Display type="inline-flex" justify="center" align="center" gap="05">
        <Text size="xs">LM Publisher -</Text>
        <BuildInfoBadge />
      </Display>
    </footer>
  );
}
