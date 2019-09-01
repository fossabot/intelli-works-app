import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Share, ValidateResponse} from '../models/Share';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
      private http: HttpClient
  ) { }

  doLogin(code: string): Observable<string> {
    const url = Share.base + 'code/';
    return this.http.get<string>(url + code, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<string>(`Cannot do login.`))
    );
  }

  checkToken(token: string): Observable<ValidateResponse> {
    const url = Share.base + 'code/verify/';
    return this.http.get<ValidateResponse>(url + token, Share.httpOptions).pipe(
        catchError(Share.handleHttpError<ValidateResponse>(`Cannot check token.`))
    );
  }
}
