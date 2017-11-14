import { Component, OnInit } from '@angular/core';
import { ShareDataService } from './shared/services/shared-data.service';
import { AppAreas } from './shared/enums/app-areas';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
import { UserService } from './user/user.service';

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
        appId: '1624861777576849',
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
    
    this.fb.login()
      .then((response: LoginResponse) => {
        console.log(response);
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
