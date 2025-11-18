import { createFileRoute, redirect } from '@tanstack/react-router';
import {
  ImageGeneratorForm,
  ImageGeneratorInfos,
} from '@features/image-tools/generator';
import { Headline } from '@common/components/headline';
import { appRoutes } from '@src/appRoutes';
import { ImageGeneratedList } from '@features/image-tools/generator/components/image-generated-list';
import { useState } from 'react';
import { Divider } from '@common/components/divider';

type GeneratedImage = {
  name: string;
  url: string;
  isNew: boolean;
};

const ImageGeneratorPage = () => {
  const [generatedList, setGeneratedList] = useState<GeneratedImage[]>([]);
  const handleOnGenerated = (generatedImage: { name: string; url: string }) => {
    setGeneratedList((prev: GeneratedImage[]) => [
      { ...generatedImage, isNew: true },
      ...prev.map(image => ({
        name: image.name,
        url: image.url,
        isNew: false,
      })),
    ]);
  };
  return (
    <>
      <Headline
        title={ImageGeneratorInfos.name}
        description={ImageGeneratorInfos.description}
      />
      <div className="lm-publisher-m-spacer-3">
        <ImageGeneratorForm onGenerated={handleOnGenerated} />
      </div>
      <Divider variant="dashed" />
      <ImageGeneratedList list={generatedList} />
    </>
  );
};

export const Route = createFileRoute('/image/generator/')({
  component: ImageGeneratorPage,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: appRoutes.login,
        search: {
          redirect: location.href,
        },
      });
    }
    // You can add any pre-load logic here if needed
  },
});
