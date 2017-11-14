import { Component, OnInit } from '@angular/core';
import { ShareDataService } from './shared/services/shared-data.service';
import { AppAreas } from './shared/enums/app-areas';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
import { UserService } from './user/user.service';
import { LoginOptions } from 'ngx-facebook/dist/esm/models/login-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public appArea: AppAreas;
  public loggedIn: boolean = false;

  constructor(private sharedService: ShareDataService, private fb: FacebookService, private userService: UserService){
      this.sharedService.setCurrentArea(AppAreas.Start);

      let initParams: InitParams = {
        appId: '2050633918500176',
        xfbml: true,
        version: 'v2.8'
      };
  
      fb.init(initParams);
  }

  ngOnInit() {
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
        this.userService.getUserInfo(response.authResponse.userID, response.authResponse.accessToken)
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

  private handleError(error) {
    console.error('Error processing action', error);
  }
}
