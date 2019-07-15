import { Component } from '@angular/core';
import * as Msal from 'msal';
import { MsalService } from './services/msal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestMSAL';

  constructor(private msalService: MsalService) {

  }

  useremail() {
    return this.msalService.getUserEmail();
  }
  getUserName() {
    return this.msalService.getUserName();
  }
  getUserInfo() {
    return this.msalService.getUserInfo();
  }
  getOtherInfo() {
    return this.msalService.getOtherInfo();
  }
  getUserState() {
    return this.msalService.getUserState();
  }

  login() {
    this.msalService.login();
  }
  signup() {
    this.msalService.signup();
  }
  forgot() {
    this.msalService.forgot();
  }

  loginRedirect() {
    this.msalService.loginRedirect();
  }
  signupRedirect() {
    this.msalService.signupRedirect();
  }
  forgotRedirect() {
    this.msalService.forgotRedirect();
  }

  logout() {
    this.msalService.logout();
  }

  isUserLoggedIn() {
    return this.msalService.isLoggedIn();
  }

  getAccessTokenFromCache() {
    return this.msalService.getAccessTokenFromCache();
  }
  getIdToken(){
    return this.msalService.getIdToken();
  }
  getClientInfo(){
    return this.msalService.getClientInfo();    
  }
}
