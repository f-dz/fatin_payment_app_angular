import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { errorHandler } from 'src/app/helper/helpers/errorHandler';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = `http://fatin-payment-app.herokuapp.com/api/authmanagement`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  get isAuthenticated() {
    return !!this.getAuthorizationToken()
  }

  get isHasSession() {
    const token = this.getExpiredToken();
    const jwtToken = JSON.parse(atob(token!.split('@')[1]));
    console.log(`jwtToken ${jwtToken}`);
    const tokenExpired = Date.now() > (jwtToken.exp * 1000);
    if (tokenExpired) return false;
    return true;
  }

  getAuthorizationToken () {
    return localStorage.getItem('app_token')
  }

  setAuthorizationToken (token: string) {
    return localStorage.setItem('app_token', token);
  }

  getAuthorizationRefreshToken () {
    return localStorage.getItem('app_refresh_token')
  }

  setAuthorizationRefreshToken (token: string) {
    return localStorage.setItem('app_refresh_token', token)
  }

  getExpiredToken () {
    return localStorage.getItem('token')
  }

  setExpiredToken (token: string) {
    return localStorage.setItem('token', this.generateTokenExpired(token));
  }

  generateTokenExpired(token: string) {
    const tokenPayload = { exp: Math.round(new Date(Date.now() + 30*60*1000).getTime() / 1000) }
    return `${token}@${btoa(JSON.stringify(tokenPayload))}`;
  }

  register(user: User): Observable<any>{
    const api = `${this.endpoint}/register`;
    return this.http
    .post(api, user)
    .pipe( catchError(errorHandler) )
  }

  login(user: User) {
    const api = `${this.endpoint}/login`;
    return this.http
    .post(api, user)
    .pipe(catchError(errorHandler) )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('app_token');
    localStorage.removeItem('app_refresh_token');
  }

}

