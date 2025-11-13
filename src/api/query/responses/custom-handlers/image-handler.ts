import type { ClbHandlers } from './types';

export type ImageResponseSuccessPayload = {
  url: string;
  size: number;
  name: string;
  mimeType: string;
  format: string;
};

const getFormatForMimeType = (mimeType: string): string => {
  const parts = mimeType.split('/');
  return parts.length > 1 ? parts[1] : '';
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
    const url = URL.createObjectURL(blob);
    const imgName = url.split('/').pop() || `image-${Date.now()}`;
    const type = blob.type ? getFormatForMimeType(blob.type) : '';
    const ext = type ? `.${type}` : '';

    return clb.onSuccess({
      url: URL.createObjectURL(blob),
      size: blob.size,
      name:
        response.headers.get('Content-Disposition')?.split('filename=')[1] ||
        `${imgName}${ext}`,
      mimeType: blob.type,
      format: type,
    });
  } catch (error) {
    console.log('Error handling image response:', error);
    return clb.onError(response);
  }
};
