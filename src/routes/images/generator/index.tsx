import { createFileRoute, redirect } from '@tanstack/react-router';
import { ImageGeneratorForm } from '../../../features/image-tools/components/ImageGeneratorForm';
import { ImageGeneratorToolInfos } from '../../../features/image-tools/config/image-tools-infos';
import { Headline } from '../../../components/Headline';

const ImageGeneratorPage = () => {
  return (
    <>
      <Headline
        title={ImageGeneratorToolInfos.name}
        description={ImageGeneratorToolInfos.description}
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
