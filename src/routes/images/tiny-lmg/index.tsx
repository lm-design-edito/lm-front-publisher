import { ImageTinyLMGInfos, TinyLMGForm } from '@features/image-tools/tiny-lmg';
import { createFileRoute } from '@tanstack/react-router';
import type { CustomRouteContext } from '../../../router';
import { checkForAuthentifacted } from '../../../route-middleware';

import { Headline } from '@common-components/headline';

const TinyLMGPage = () => {
  return (
    <div className="tiny-lmg-page">
      <Headline
        title={ImageTinyLMGInfos.name}
        description={ImageTinyLMGInfos.description}
      />
      <TinyLMGForm />
    </div>
  );
};

export const Route = createFileRoute('/images/tiny-lmg/')({
  component: TinyLMGPage,
  beforeLoad: async ({ context }: { context: CustomRouteContext }) => {
    checkForAuthentifacted({ context });
    // You can add any pre-load logic here if needed
  },
});
