import { query } from './query';
import { queries } from './queries';
import { auth } from './auth';
import { helpers } from './helpers/index';

export {
  type APIResponseErrorType,
  type APIResponseSuccessType,
} from './query/responses';

export const api = {
  auth,
  query,
  queries,
  helpers,
};
