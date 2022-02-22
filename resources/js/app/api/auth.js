import ApiClientService from '$app/services/ApiClientService';

export function userRequest() {
  return ApiClientService.getInstance().client({
    url: '/api/auth/user',
    method: 'get',
  });
}
export function signInRequest(params) {
  return ApiClientService.getInstance().client({
    url: '/api/auth/login',
    method: 'post',
    data: params
  });
}

export function signOutRequest(params) {
  return ApiClientService.getInstance().client({
    url: '/api/auth/logout',
    method: 'post',
    data: params
  });
}

export function registerRequest(params) {
  return ApiClientService.getInstance().client({
    url: '/api/auth/register',
    method: 'post',
    data: params
  });
}

export function verifyRequest(code) {
  return ApiClientService.getInstance().client({
    url: '/api/auth/verify',
    method: 'post',
    data: {code}
  });
}

export function resendVerifyCodeRequest(phone) {
  return ApiClientService.getInstance().client({
    url: '/api/auth/verify/resend-code',
    method: 'post',
    data: {phone}
  });
}

export function resetPassword(phone) {
  return ApiClientService.getInstance().client({
    url: '/api/auth/reset-password',
    method: 'post',
    data: {phone}
  });
}

export function resetPasswordNewPassword(params) {
  return ApiClientService.getInstance().client({
    url: '/api/auth/reset-password/new-password',
    method: 'post',
    data: params
  });
}