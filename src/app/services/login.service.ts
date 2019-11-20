import { Injectable } from '@angular/core';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { environment } from './../../environments/environment';

class Logindata {
  Username: string;
  Password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  get getCognitoPoolData() {
    return environment.config.cognito;
  }

  get generateDummyJWT() {
    // obviously this practice is only for test projects (like this) and NEVER any application that handles sensitive data.
    const dummyJWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkw
    IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSM
    eKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

    return dummyJWT;
  }

  public loginAuthenticateUser(
    userLoginData: Logindata,
    callback: (authDetails: object,
               cognitoUser: any,
               cognitoPoolData: any,
               token: string) => void) {

      const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(userLoginData);
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(this.getCognitoPoolData);
      const userData = {
        Username: userLoginData.Username,
        Pool: userPool
      };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      // and then when submitted...
      if (callback) {
        callback(authDetails, cognitoUser, this.getCognitoPoolData, this.generateDummyJWT);
      }
  }
}
