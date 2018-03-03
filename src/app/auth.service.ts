import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Cookies from 'es-cookie';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  username: string;
  loggedUser: any;
  message: string;

  constructor(private http: HttpClient) { 
    this.loggedUser = {};
    this.message = null;
  }

  login(username: string, password: string): Observable<any>{
    let obj = {
      "username": username,
	    "password": password
    }
    return this.http.post<any>("http://localhost:3000/users/auth",obj).do(
      result => {
        Cookies.set("token", result.token);
        
        this.loggedUser = {
          fullname : result.fullname,
          department : result.department,
          access : result.access
        };
        this.isLoggedIn = result.login;
        this.message = result.message;
        
      }
    );
  }

  verify():Observable<any>{
    let obj = {
      "token": Cookies.get('token')
    }

    return this.http.post<any>("http://localhost:3000/users/verify",obj).do(
      result => {
        this.loggedUser = {
          fullname : result.fullname,
          department : result.department,
          access : result.access
        };
        this.isLoggedIn = result.login;
        this.message = result.message;
      }
    );
  }

  logout(): void{
    this.username = null;
    this.isLoggedIn = false;
  }

}
