import { Component, OnInit, NgZone } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { InitParams } from 'ngx-facebook/dist/esm/models/init-params';
import { FacebookService } from 'ngx-facebook/dist/esm/providers/facebook';
import { GoogleAuthService } from '../google-auth.service';
import { UserService } from '../../user/user.service';
import { AppGlobals } from '../app-globals';
import { LoginOptions } from 'ngx-facebook/dist/esm/models/login-options';
import { LoginResponse } from 'ngx-facebook/dist/esm/models/login-response';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  imageURL: string;
  email: string;
  name: string;
  token: string;
  authenticationType: string;
  role: string;

  constructor(private fb: FacebookService,
    private userService: UserService, private _googleAuth: GoogleAuthService, private zone: NgZone) { 
    let initParams: InitParams = {
      appId: environment.FACEBOOK_APP_ID,
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);

  }

  ngOnInit() {
    AppGlobals.GOOGLE_CLIENT_ID = environment.GOOGLE_CLIENT_ID;   
  
    this.userService.getAllUsers().subscribe(data=> {
      console.log(data);
    })
  }

  ngAfterViewInit() {
    this.getData();
    this.loginWithGoogle() 
  }

  loginWithFacebook(): void {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email'
    };


    this.fb.login(loginOptions)
      .then((response: LoginResponse) => {
        console.log(response);
        this.userService.loginUserFacebook(response.authResponse.userID, response.authResponse.accessToken)
          .subscribe(data => {

            //Setting data to localstorage.
            localStorage.setItem('token', response.authResponse.accessToken);
            localStorage.setItem('image', '');
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            localStorage.setItem('authenticationType', '1');
            localStorage.setItem('role', data.role);

            this.token = response.authResponse.accessToken;
            this.imageURL = '';
            this.name = data.name;
            this.email = data.email;
            this.role = data.role;
          });
        this.getProfile();
      })
      .catch((error: any) => console.error(error));

  }

  getProfile() {
    this.fb.api('/me')
      .then((res: any) => {
        console.log('Got the users profile', res);
      })
      .catch(this.handleError);
  }

  loginWithGoogle():void {
    setTimeout(() => {  
      this._googleAuth.authenticateUser((result) => {
        localStorage.setItem('authenticationType', '2');
        //Using Angular2 Zone dependency to manage the scope of variables
        this.zone.run(() => {
          this.getData();
        });
      });
    }, 50);
  }

  private handleError(error) {
    console.error('Error processing action', error);
  }

  getData() {
    setTimeout(() => { 
      this.token = localStorage.getItem('token');
      this.imageURL = localStorage.getItem('image');
      this.name = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
      this.authenticationType = localStorage.getItem('authenticationType');

      if (this.token){
        this.userService.loginUserGoogle(this.token)
        .subscribe(data => {
          debugger;
          this.role = data.role;
          console.log(data);
        });
      }

    }, 50);
  }

  /**
   * Logout user and calls function to clear the localstorage
   */
  logout() {
    debugger;
    if (this.authenticationType == '2'){
      let scopeReference = this;
      this._googleAuth.userLogout(function () {
        scopeReference.clearLocalStorage();
      });
    }
    else {
      this.fb.logout().then(data => {
        this.clearLocalStorage();
      })
    }

  }

  /**
   * Clearing Localstorage of browser
   */
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('authenticationType');
    localStorage.removeItem('role');
  }

}
