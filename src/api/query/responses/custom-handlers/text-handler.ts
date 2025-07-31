import type { ClbHandlers } from './types';

export type TextResponseSuccessPayload = string;

export const responseTextHandler = async (
  response: Response,
  clbs: ClbHandlers<TextResponseSuccessPayload>,
) => {
  if (response.ok) {
    return clbs.onSuccess(await response.text());
  }

  return clbs.onError(response);
};
