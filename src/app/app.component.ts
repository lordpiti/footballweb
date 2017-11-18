import { Component, OnInit, NgZone  } from '@angular/core';
import { ShareDataService } from './shared/services/shared-data.service';
import { AppAreas } from './shared/enums/app-areas';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
import { UserService } from './user/user.service';
import { LoginOptions } from 'ngx-facebook/dist/esm/models/login-options';
import { AuthService, AppGlobals } from 'angular2-google-login';
import { AfterViewInit } from 'angular2-google-login/node_modules/@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  public appArea: AppAreas;
  public loggedIn: boolean = false;

  imageURL: string;
  email: string;
  name: string;
  token: string;

  constructor(private sharedService: ShareDataService, private fb: FacebookService, 
    private userService: UserService, private _googleAuth: AuthService, private zone: NgZone){
      this.sharedService.setCurrentArea(AppAreas.Start);

      let initParams: InitParams = {
        appId: '2050633918500176',
        xfbml: true,
        version: 'v2.8'
      };
  
      fb.init(initParams);
  }

  ngAfterViewInit() {
    AppGlobals.GOOGLE_CLIENT_ID = '357813264391-bc51b2u0ohaeb6v78k2b2tpr5pdi6c09.apps.googleusercontent.com'; 

    this.getData();
    this.loginWithGoogle() 
  }

  ngOnInit() {

    AppGlobals.GOOGLE_CLIENT_ID = '357813264391-bc51b2u0ohaeb6v78k2b2tpr5pdi6c09.apps.googleusercontent.com';

    this.sharedService.getCurrentArea().subscribe(data => {
      this.appArea = data;
    });

    this.userService.getAllUsers().subscribe(data=> {
      console.log(data);
    })
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
            this.sharedService.authenticationToken = response.authResponse.accessToken;
            console.log(data);
          });
        this.loggedIn = true;
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
        debugger;
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

      if (this.token){
        this.userService.loginUserGoogle(this.token)
        .subscribe(data => {
          this.sharedService.authenticationToken = this.token;
          console.log(data);
        });
      }

    }, 50);
  }

  /**
   * Logout user and calls function to clear the localstorage
   */
  logout() {
    let scopeReference = this;
    this._googleAuth.userLogout(function () {
      scopeReference.clearLocalStorage();
    });
  }

  /**
   * Clearing Localstorage of browser
   */
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }
}
