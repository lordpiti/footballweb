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
        .then((response: LoginResponse) => console.log(response))
        .catch((error: any) => console.error(error));
  
    }
}
