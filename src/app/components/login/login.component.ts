import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  submitted = false;
  userPoolNotDefined = false;
  cognitoFailed = null;

  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.email = this.formBuilder.control('', Validators.required);
    this.password = this.formBuilder.control('', Validators.required);

    this.loginForm = this.formBuilder.group({
      username: this.email,
      password: this.password
    });
  }

  get getCognitoPoolData() {
    return environment.config.cognito;
  }

  get getLoginData() {
    return {
      Username: this.loginForm.value.username,
      Password: this.loginForm.value.password
    };
  }

  get generateDummyJWT() {
    // obviously this practice is only for test projects (like this) and NEVER any application that handles sensitive data.
    const dummyJWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkw
    IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSM
    eKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

    if (this.cognitoFailed) {
      return dummyJWT;
    }
    return null;
  }

  authenticateUser() {
    this.cognitoFailed = null;
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(this.getLoginData);
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(this.getCognitoPoolData);
    const userData = {
      Username: this.loginForm.value.username,
      Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    // and then when submitted...
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: any) => {
        const accessToken = result.getAccessToken().getJwtToken();
        console.log(accessToken);
      },
      onFailure: (error: any) => {
        console.log(error.message || JSON.stringify(error));
        this.cognitoFailed = error.message ? error.message : 'Failed to connect to Cognito.';

        // here we just check to see if it is an error with our user pool. If so, then one needs to be set up so
        // let's just check for a specific error first and only proceed if the error matches.
        // so AWS charges you for used services this app will utilize some hackery here:
        const noDefinedUserPool = 'User pool ' + this.getCognitoPoolData.UserPoolId + ' does not exist.';
        if (this.cognitoFailed === noDefinedUserPool) {
          localStorage.setItem('token', this.generateDummyJWT);
          // navigate to the homescreen.
          this.userPoolNotDefined = true;
        }
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return false;
    }
    // authenticate our user.
    this.authenticateUser();
    // display form values on success
    console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    return;
  }

}
