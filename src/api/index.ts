import { query } from './query';
import { queries } from './queries';
import { auth } from './auth';

export {
  type APIREsponseErrorType,
  type APIREsponseSuccessType,
} from './query/responses';

export const api = {
  auth,
  query,
  queries,
};
