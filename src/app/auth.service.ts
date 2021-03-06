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
        Cookies.set("token", result.token, {
           expires: result.expIn
        });
        
        this.loggedUser = {
          fullname : result.fullname,
          department : result.department,
          access : result.access,
          avatar : result.avatar
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

    return this.http.get<any>("http://localhost:3000/users/verify",{
      headers:{
        'token': `${obj.token}`
      }
    }).do(
      result => {
        this.loggedUser = {
          fullname : result.fullname,
          department : result.department,
          access : result.access,
          avatar : result.avatar
        };
        this.isLoggedIn = result.login;
        this.message = result.message;
      }
    );
  }

  logout(): void{
    Cookies.remove('token');
    console.log(Cookies.getAll());
    
    this.loggedUser = {};
    this.isLoggedIn = false;
  }

}
