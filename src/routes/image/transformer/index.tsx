import { Headline } from '@common-components/headline';
import {
  ImageTransformerInfos,
  TransformerForm,
} from '@features/image-tools/transformer';
import { createFileRoute } from '@tanstack/react-router';
import { checkForAuthentifacted } from '../../../route-middleware';
import type { CustomRouteContext } from '../../../router';

const TransformerPage = () => {
  return (
    <div>
      <Headline
        title={ImageTransformerInfos.name}
        description={ImageTransformerInfos.description}
      />
      <TransformerForm />
    </div>
  );
};

export const Route = createFileRoute('/image/transformer/')({
  component: TransformerPage,
  beforeLoad: async ({ context }: { context: CustomRouteContext }) => {
    checkForAuthentifacted({ context });
    // You can add any pre-load logic here if needed
  },
});
