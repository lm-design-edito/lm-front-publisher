import { admin } from './admin';
import { auth } from './auth';
import { image } from './image';

export {
  type ImageGenerateResponseSuccessType,
  type ImageTransformResponseSuccessType,
} from './image';

export const queries = {
  auth,
  admin,
  image,
};
