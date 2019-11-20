import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder,
    private loginService: LoginService) { }

  ngOnInit() {
    this.email = this.formBuilder.control('', Validators.required);
    this.password = this.formBuilder.control('', Validators.required);

    this.loginForm = this.formBuilder.group({
      username: this.email,
      password: this.password
    });
  }

  get getLoginData() {
    return {
      Username: this.loginForm.value.username,
      Password: this.loginForm.value.password
    };
  }

  userLoginAuthenticate(cb?: (loginForm: any) => void) {
    this.loginService.loginAuthenticateUser(this.getLoginData,
      (authDetails, user, cognitoData, token) => {
        // and then when submitted...
        user.authenticateUser(authDetails, {
          onSuccess: (result: any) => {
            const accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken);

            cb(this.loginForm);
          },
          onFailure: (error: any) => {
            console.log(error.message || JSON.stringify(error));
            this.cognitoFailed = error.message ? error.message : 'Failed to connect to Cognito.';
            // here we just check to see if it is an error with our user pool. If so, then one needs to be set up so
            // let's just check for a specific error first and only proceed if the error matches.
            // so AWS charges you for used services this app will utilize some hackery here:
            const noDefinedUserPool = 'User pool ' + cognitoData.UserPoolId + ' does not exist.';
            if (this.cognitoFailed === noDefinedUserPool) {
              localStorage.setItem('token', token);
              // navigate to the homescreen.
              this.userPoolNotDefined = true;
            }

            cb(this.loginForm);
          }
        });
    });
  }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
        return false;
    }
    // authenticate our user.
    this.userLoginAuthenticate((formData) => {
      // display form values on success
      console.log('SUCCESS!! :-)\n\n' + JSON.stringify(formData.value, null, 4));
      return;
    });
  }

}
