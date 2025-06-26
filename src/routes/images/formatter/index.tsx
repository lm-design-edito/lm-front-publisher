import { createFileRoute, redirect } from '@tanstack/react-router';
import { ImageFormatterForm } from '../../../features/image-tools/components/ImageFormatterForm';
import { Headline } from '../../../components/Headline';
import { ImageFormatterToolInfos } from '../../../features/image-tools/config/image-tools-infos';

const ImageFormatterPage = () => {
  return (
    <div className="image-formatter-page">
      <Headline
        title={ImageFormatterToolInfos.name}
        description={ImageFormatterToolInfos.description}
      />
      <ImageFormatterForm />
    </div>
  );
};

export const Route = createFileRoute('/images/formatter/')({
  component: ImageFormatterPage,
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
