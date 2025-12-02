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

const getFileInformations = (blob: Blob, response: Response) => {
  const url = URL.createObjectURL(blob);
  const defaultImageName = url.split('/').pop() || `image-${Date.now()}`;
  const fileType = blob.type ? getFormatForMimeType(blob.type) : '';
  const fileExtension = fileType ? `.${fileType}` : '';

  let fileName = `${defaultImageName}${fileExtension}`;

  const disposition =
    response.headers && response.headers.get('Content-Disposition');
  if (disposition) {
    const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
    console.group(filenameMatch);
    if (filenameMatch && filenameMatch[1]) {
      fileName = filenameMatch[1];
    }
  }
  return {
    mimeType: blob.type,
    format: fileType,
    name: fileName,
    downloadUrl: url,
  };
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
    const { downloadUrl, name, mimeType, format } = getFileInformations(
      blob,
      response,
    );

    return clb.onSuccess({
      url: downloadUrl,
      size: blob.size,
      name,
      mimeType,
      format,
    });
  } catch (error) {
    console.log('Error handling image response:', error);
    return clb.onError(response);
  }
};
