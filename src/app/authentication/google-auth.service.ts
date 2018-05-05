import { Injectable } from '@angular/core';
import { AppGlobals } from './app-globals';
import { environment } from '../../environments/environment';

declare const gapi: any;

@Injectable()
export class GoogleAuthService {

  constructor() { }

  /**
   * Calling Google login API and fetching account details.
   * @param callback Callback to function
   */
  public authenticateUser(callback) {
    let auth2: any;
    gapi.load('auth2', function () {
      auth2 = gapi.auth2.init({
        client_id: AppGlobals.GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      // Login button reference
      const loginButton: any = document.getElementById('google-login-button');
      auth2.attachClickHandler(loginButton, {},
        function (userDetails) {
          // Getting profile object
          const profile = userDetails.getBasicProfile();

          // Setting data to localstorage.
          localStorage.setItem('token', userDetails.getAuthResponse().id_token);
          localStorage.setItem('image', profile.getImageUrl());
          localStorage.setItem('name', profile.getName());
          localStorage.setItem('email', profile.getEmail());

          callback(true);
        }, function (error) {
          console.log(JSON.stringify(error, undefined, 2));
        });
    });
  }

  /**
   * Logout user from Google
   * @param callback Callback to function
   */
  userLogout(callback) {
    // You will be redirected to this URL after logging out from Google.
    const homeUrl = environment.home_url;
    const logoutUrl = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=' + homeUrl;
    document.location.href = logoutUrl;
    callback();
  }
}
