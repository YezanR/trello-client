import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../../dto/credentials';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {
  credentials: Credentials = new Credentials();
  errorMessage: String;
  loading: boolean;
  message: string;

  constructor(
    private authenticationService: AuthService,
    private router: Router
    ) {
  }

  ngOnInit() {
  }

  signIn() {
    this.authenticationService
      .signIn(this.credentials)
      .then(() => {
        this.errorMessage = null;
        this.router.navigateByUrl('/home');
      })
      .catch((reason) => {
        let message = '';
        if (reason.status == 0) {
          message = 'The server is unreachable';
        }
        else {
          message = reason.error.message;
        }
        this.errorMessage = message;
    });
  }
}
