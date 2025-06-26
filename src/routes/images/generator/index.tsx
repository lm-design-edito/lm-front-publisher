import { createFileRoute, redirect } from '@tanstack/react-router';
import {
  ImageGeneratorForm,
  ImageGeneratorInfos,
} from '@features/image-tools/generator';
import { Headline } from '../../../common-components/headline-';

const ImageGeneratorPage = () => {
  return (
    <>
      <Headline
        title={ImageGeneratorInfos.name}
        description={ImageGeneratorInfos.description}
      />
      <div className="lm-publisher-m-spacer-3">
        <ImageGeneratorForm />
      </div>
    </>
  );
};

export const Route = createFileRoute('/images/generator/')({
  component: ImageGeneratorPage,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
    // You can add any pre-load logic here if needed
  },
});
