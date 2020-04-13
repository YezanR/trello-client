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
  errors: any[];
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
        this.errors = null;
        this.router.navigateByUrl('/home');
      })
      .catch((reason) => {
        this.errors = [];
        this.errors.push({message: reason.error.message});
    });
  }
}
