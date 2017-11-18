import { Injectable } from '@angular/core';
import { AppGlobals } from './app-globals';

declare const gapi: any;

@Injectable()
export class AuthService {
  constructor() { }

  /**
   * Calling Google login API and fetching account details.
   * @param callback Callback to function
   */
  public authenticateUser(callback) {
    let auth2: any;
    let result: any;
    let error: any;
    gapi.load('auth2', function () {
      auth2 = gapi.auth2.init({
        client_id: AppGlobals.GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      //Login button reference
      let loginButton: any = document.getElementById('google-login-button');
      auth2.attachClickHandler(loginButton, {},
        function (userDetails) {
          //Getting profile object
          let profile = userDetails.getBasicProfile();

          //Setting data to localstorage.
          localStorage.setItem('token', userDetails.getAuthResponse().id_token);
          localStorage.setItem('image', profile.getImageUrl());
          localStorage.setItem('name', profile.getName());
          localStorage.setItem('email', profile.getEmail());

          //Alternatively you can create an object and return it like that -
          // result = {
          //   token: userDetails.getAuthResponse().id_token,
          //   name: profile.getName(),
          //   image: profile.getImageUrl(),
          //   email: profile.getEmail(),
          // };
          callback(true);
        }, function (error) {
          this.error = (JSON.stringify(error, undefined, 2));
        });
    });
  }

  /**
   * Logout user from Google
   * @param callback Callback to function
   */
  userLogout(callback) {
    //You will be redirected to this URL after logging out from Google.
    let homeUrl = "http://localhost:4200";
    let logoutUrl = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + homeUrl;
    document.location.href = logoutUrl;
    callback();
  }
}
