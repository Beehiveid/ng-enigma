import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  username: string;
  loggedUser: any;

  constructor(private http: HttpClient) { 
    this.loggedUser = {};
  }

  login(username: string, password: string): Observable<any>{
    let obj = {
      "username": username,
	    "password": password
    }
    return this.http.post<any>("http://localhost:3000/users/login",obj);
  }

  logout(): void{
    this.username = null;
    this.isLoggedIn = false;
  }

}
