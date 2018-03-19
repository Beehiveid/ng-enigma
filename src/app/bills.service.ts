import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from 'rxjs/operators';
import * as Cookies from 'es-cookie';

@Injectable()
export class BillsService {
  token: any;

  constructor(private http: HttpClient) { 
    this.token = {
      headers:{
        'token':Cookies.get("token")
      }
    }
  }

  getBills(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/bills",this.token);
  }

  getUnpaidBill(id:any): Observable<any>{
    return this.http.get<any>("http://localhost:3000/bills/"+id,this.token);
  }

  getBill(id:any, stats: any): Observable<any>{
    return this.http.get<any>("http://localhost:3000/bills/"+id+"/"+stats,this.token);
  }

  postBills(obj: any): Observable<any>{
    return this.http.post<any>("http://localhost:3000/bills/paybills",obj,this.token);
  }
}
