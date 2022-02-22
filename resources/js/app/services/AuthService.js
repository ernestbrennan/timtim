import {
  userRequest,
  registerRequest,
  signInRequest,
  signOutRequest,
  verifyRequest,
  resendVerifyCodeRequest,
  resetPassword,
  resetPasswordNewPassword,
} from '$app/api/auth';

const token_key = 'auth_token';

export default class AuthService {
  static _instance;

  _user;
  _token;

  static getInstance() {
    if (!this._instance) {
      this._instance = new AuthService();
    }
    return this._instance;
  }

  constructor() {

    this._token = localStorage.getItem(token_key)
    //
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     user.getIdToken().then((data) => {
    //     });
    //   }
    //   this._user = user;
    // });
  }

  onAuthenticated(cb) {
    firebase.auth().onAuthStateChanged((user) => {
      cb(user !== null, user);
    });
  }

  async getIdToken() {
    if (!this._user) {
      return null;
    }
    return await this._user.getIdToken();
  }

  loadUser() {
    return userRequest();
  }

  signIn(params) {
    return signInRequest(params);
  }

  register(params) {
    return registerRequest(params);
  }

  verify(code) {
    return verifyRequest(code);
  }

  resendVerifyCode(code) {
    return resendVerifyCodeRequest(code);
  }

  resetPassword(phone) {
    return resetPassword(phone);
  }

  resetPasswordNewPassword(phone) {
    return resetPasswordNewPassword(phone);
  }

  signOut() {
    return signOutRequest();
  }

  setUser(user) {
    this._user = user;
    return this;
  }

  getUser() {
    return this._user;
  }

  setToken(token) {
    this._token = token;
    localStorage.setItem(token_key, token)

    return this
  }

  getToken() {
    return this._token;
  }
}
