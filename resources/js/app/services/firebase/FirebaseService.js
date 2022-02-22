import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import { firebaseCredentials } from '$js/config';

export default class FirebaseService {
  static _instance;

  _user;

  static getInstance() {
    if (!this._instance) {
      this._instance = new FirebaseService();
    }
    return this._instance;
  }

  constructor() {
    firebase.initializeApp(firebaseCredentials);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((data) => {});
      }
      this._user = user;
    });
  }

  onAuthentificated(cb) {
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
  _signInWith(provider) {
    return firebase.auth().signInWithPopup(provider);
  }
  signInWithGoogle() {
    return this._signInWith(new firebase.auth.GoogleAuthProvider());
  }

  signInWithPhone(phone, verifier) {
    return firebase.auth().signInWithPhoneNumber(phone, verifier);
  }

  signInWithFacebook() {
    return this._signInWith(new firebase.auth.FacebookAuthProvider());
  }

  signOut() {
    firebase.auth().signOut();
  }

  signInAnonymously() {
    return firebase.auth().signInAnonymously();
  }

  currentUser() {
    return this._user;
  }

  analytics() {
    return firebase.analytics();
  }
}
