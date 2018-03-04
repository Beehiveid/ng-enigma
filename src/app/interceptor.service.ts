import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as Cookies from 'es-cookie';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor() { 
    console.log("Interceptor");
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    const token = Cookies.get('token');

    if(token){
      console.log("Token exist");
      
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });

      return next.handle(cloned);
    }
    console.log("Token doesn't exist");
    return next.handle(req);
  }

}
