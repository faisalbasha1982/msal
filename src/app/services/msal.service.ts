import { Injectable } from '@angular/core';

import * as Msal from 'msal';

declare var bootbox: '';
@Injectable()
export class MsalService {

  B2CTodoAccessTokenKey = 'b2c.access.token';


  tenantConfig = {
    tenant: 'digitalpayrollservices.onmicrosoft.com',
    clientID: '0a3fd7db-e748-4a4d-b9d5-e022ddc100e1',
    signInPolicy: 'B2C_1_SelfServiceSignUpSignIn',
    signUpPolicy: 'B2C_1_SelfServiceSignUpSignIn',
    forgotPassword: 'B2C_1_SelfServicePasswordChange',
    redirectUri: 'http://localhost:4400',
    b2cScopes: [
      'https://digitalpayrollservices.onmicrosoft.com/dev/user.read.all',
      'https://digitalpayrollservices.onmicrosoft.com/dev/profile',
      'https://digitalpayrollservices.onmicrosoft.com/dev/email',
      'https://digitalpayrollservices.onmicrosoft.com/dev/openid',
      'https://digitalpayrollservices.onmicrosoft.com/dev/user_impersonation'
    ]
  };

  // Configure the authority for Azure AD B2C
  authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.signInPolicy;



  /*
   * B2C SignIn SignUp Policy Configuration
   */
  clientApplication = new Msal.UserAgentApplication(
    this.tenantConfig.clientID, this.authority,
    function (errorDesc: any, idToken: any, error: any, tokenType: any) {
      let _this = this;

      _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
        function (accessToken: any) {
          _this.saveAccessTokenToCache(accessToken);
        }, function (error: any) {
          _this.clientApplication.acquireTokenRedirect(_this.tenantConfig.b2cScopes).then(
            function (accessToken: any) {
              _this.saveAccessTokenToCache(accessToken);
            }, function (error: any) {
              console.log('error: ', error);
            });
        });
    }
  );

  public login(): void {
    this.clientApplication.authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.signInPolicy;
    this.authenticate();
  }

  public signup(): void {
    this.clientApplication.authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.signUpPolicy;
    this.authenticate();
  }
  public forgot(): void {
    this.clientApplication.authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.forgotPassword;
    this.authenticate();
  }

  public authenticate(): void {
    let _this = this;
    this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
      _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
        function (accessToken: any) {
          _this.saveAccessTokenToCache(accessToken);
        }, function (error: any) {
          _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
            function (accessToken: any) {
              _this.saveAccessTokenToCache(accessToken);
            }, function (error: any) {
              console.log('error: ', error);
            });
        });
    }, function (error: any) {
      console.log('error: ', error);
    });
  }

  public loginRedirect(): void {
    this.clientApplication.authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.signInPolicy;
    this.authenticateRedirect();
  }

  public signupRedirect(): void {
    this.clientApplication.authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.signUpPolicy;
    this.authenticateRedirect();
  }

  public forgotRedirect(): void {
    this.clientApplication.authority = 'https://login.microsoftonline.com/tfp/' + this.tenantConfig.tenant + '/' + this.tenantConfig.forgotPassword;
    this.authenticateRedirect();
  }

  public authenticateRedirect(): void {
    let _this = this;
    this.clientApplication.loginRedirect(this.tenantConfig.b2cScopes);
  }

  saveAccessTokenToCache(accessToken: string): void {
    sessionStorage.setItem(this.B2CTodoAccessTokenKey, accessToken);
  }

  getAccessTokenFromCache() {
    return sessionStorage.getItem('b2c.access.token');
  }
    
  getIdToken() {
    return sessionStorage.getItem('msal.idtoken');
  }
  
  getClientInfo() {
    return sessionStorage.getItem('msal.client.info');
  }

  logout(): void {
    this.clientApplication.logout();
  }

  isLoggedIn(): boolean {
    return this.clientApplication.getUser() != null;
  }

  getUserEmail(): string {
    return this.getUser().idToken['emails'][0];
  }
  getUserName(): string {
    return JSON.stringify(this.clientApplication);
  }

  getOtherInfo(): string {
    return JSON.stringify(this.clientApplication.cacheLocation);
  }

  getUserState(): string {
    return this.clientApplication.getUserState('');
  }

  getUserInfo(): string {
    return JSON.stringify(this.getUser());
  }

  getUser() {
    return this.clientApplication.getUser();
  }
}
