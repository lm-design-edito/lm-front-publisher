import type { ClbHandlers } from './types';

export type ImageResponseSuccessPayload = {
  url: string;
  size: number;
  name: string;
  mimeType: string;
};

export const responseImageHandler = async (
  response: Response,
  clb: ClbHandlers<ImageResponseSuccessPayload>,
) => {
  if (!response.ok) {
    return clb.onError(response);
  }
  try {
    const blob = await response.blob();
    return clb.onSuccess({
      url: URL.createObjectURL(blob),
      size: blob.size,
      name:
        response.headers.get('Content-Disposition')?.split('filename=')[1] ||
        `image-${Date.now()}.${blob.type.split('/')[1]}`,
      mimeType: blob.type,
    });
  } catch (error) {
    console.log('Error handling image response:', error);
    return clb.onError(response);
  }
};
