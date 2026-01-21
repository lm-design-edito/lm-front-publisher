import { login } from './login';
import { logout, logoutEverywhere } from './logout';
import { refreshToken } from './refresh-token';
import { requestEmailVerificationToken } from './request-email-verification-token';
import { signup } from './signup';
import { verifyEmail } from './verify-email';
import { whoAmI } from './whoami';
import { requestNewPassword } from './request-new-password';
import { submitNewPassword } from './submit-new-password';

export const auth = {
  whoAmI,
  login,
  logout,
  logoutEverywhere,
  signup,
  requestEmailVerificationToken,
  verifyEmail,
  requestNewPassword,
  submitNewPassword,
  debugRefreshToken: () => {
    console.warn(
      'Debug refresh token called, this should not be used in production!',
    );
    return refreshToken();
  },
};
