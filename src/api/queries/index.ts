import { admin } from './admin';
import { auth } from './auth';
import { designEdito } from './design-edito';
import { image } from './image';

export {
  type ImageGenerateResponseSuccessType,
  type ImageTransformResponseSuccessType,
} from './image';

export { type ThumbsUploadResponseSuccessType } from './design-edito';

export const queries = {
  auth,
  admin,
  image,
  designEdito,
};
