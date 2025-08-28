import { createFileRoute, redirect } from '@tanstack/react-router';
import { Headline } from '../../../common-components/headline';
import {
  ImageFormatterForm,
  ImageFormatInfos,
} from '@features/image-tools/format';

const ImageFormatterPage = () => {
  return (
    <div className="image-formatter-page">
      <Headline
        title={ImageFormatInfos.name}
        description={ImageFormatInfos.description}
      />
      <ImageFormatterForm />
    </div>
  );
};

export const Route = createFileRoute('/image/formatter/')({
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
