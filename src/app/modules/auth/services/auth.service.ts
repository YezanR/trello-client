import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Credentials } from '../dto/credentials';
import { User } from 'src/app/entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseUrl: String = 'http://localhost:8080/api/';

  constructor(private http: HttpClient,
    private router: Router) {
  }

  signIn(credentials: Credentials) {
    return this.http.post(this.baseUrl + 'signIn', credentials)
      .pipe(
        map((response: any) => {
          localStorage.setItem('token', response.token);
        })
    ).toPromise()
  }

  logout() {
    this.destroySession();
    this.router.navigateByUrl('/auth/signIn');
  }

  getToken() : string {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  destroySession() {
    localStorage.removeItem('token');
  }

  getUser(): Promise<User> {
    return this.http.get<User>(this.baseUrl + 'signedInUser')
      .toPromise();
  }
}
