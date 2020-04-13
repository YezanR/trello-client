import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Session } from 'src/app/modules/security/session';
import { Router } from '@angular/router';
import { SignInRequest } from 'src/app/dto/sign-in-request';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  signInRequest: SignInRequest = new SignInRequest();

  errorMessage: String;

  constructor(
    private loginService: LoginService, 
    private session: Session,
    private router: Router
    ) {

    }

  ngOnInit(): void {

  }

  signIn() {
    this.loginService
      .signIn(this.signInRequest)
      .subscribe(
        response => {
          this.session.create(response.token);
          this.router.navigateByUrl('/home');
        }, 
        error => {
          this.errorMessage = error;
        });
  }
}
