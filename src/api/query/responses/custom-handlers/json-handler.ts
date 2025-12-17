import { Logger } from '@utils/logger';
import type { ClbHandlers } from './types';

export const responseJsonHandler = async (
  response: Response,
  clb: ClbHandlers<unknown>,
) => {
  if (!response.ok) {
    return clb.onError(response);
  }
  try {
    return await response.json();
  } catch (error) {
    Logger.error('ResponseJsonHandler:', error);
    return response;
  }
};
