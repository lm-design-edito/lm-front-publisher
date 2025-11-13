import { thumbUpload, thumbsUpload } from './thumbs/upload';
import { thumbDownload } from './thumbs/download';
import { templateBookGenerate } from './thumbs/template/book/generate';

export const designEdito = {
  thumbUpload,
  thumbsUpload,
  thumbDownload,
  templateBookGenerate,
};

export type { ThumbsUploadResponseSuccessType } from './thumbs/upload';
