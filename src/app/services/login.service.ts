import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Credentials } from '@app/modules/auth/dto/credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly baseUrl: String = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  public signIn(request: Credentials): Observable<any> {
    return this.http
      .post(this.baseUrl + 'signIn', request)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = ''; 
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorMessage = 'Something bad happened; please try again later.';
    } else {
      if (!(error.error instanceof ProgressEvent)) {
        errorMessage = error.error.message;
      }
    }
    // return an observable with a user-facing error message
    return throwError(errorMessage);
  };
}
