import { useState, useEffect } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import {
  ImageGeneratorForm,
  ImageGeneratorInfos,
  GeneratedImageList,
} from '@features/image-tools/generator';
import { Headline } from '@common/components/headline';
import { appRoutes } from '@src/appRoutes';
import { Divider } from '@common/components/divider';
import { Badge } from '@common/components/badge';
import { useToastContext } from '@common/hooks/useToastContext';

type GeneratedImage = {
  name: string;
  url: string;
  isNew: boolean;
};

const ImageGeneratorPage = () => {
  const [generatedList, setGeneratedList] = useState<GeneratedImage[]>([]);
  const { showToast, hideToast } = useToastContext();

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

  useEffect(() => {
    showToast({
      id: 'image-generator-beta-info',
      type: 'info',
      duration: 0,
      message:
        'Le générateur est en version beta, les résultats peuvent varier.',
    });
  }, [showToast]);

  useEffect(() => {
    return () => {
      hideToast('image-generator-beta-info');
    };
  }, [hideToast]);

  return (
    <>
      <Headline
        title={
          <>
            {ImageGeneratorInfos.name}{' '}
            <Badge size="s">{ImageGeneratorInfos.version}</Badge>
          </>
        }
        description={ImageGeneratorInfos.description}
      />
      <div className="lm-publisher-m-spacer-3">
        <ImageGeneratorForm onGenerated={handleOnGenerated} />
      </div>
      <Divider variant="dashed" />
      <GeneratedImageList list={generatedList} />
    </>
  );
};

export const Route = createFileRoute('/image/generator/')({
  staticData: {
    getBreadcrumb: () => "Générateur de médias d'appels",
    title: "Générateur de médias d'appels",
  },
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
