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
    console.log('Error handling JSON response:', error);
    return response;
  }
};
