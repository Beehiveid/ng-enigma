import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class BillsService {

  constructor(private http: HttpClient) { }

  getBills(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/bills");
  }

  getUnpaidBill(id:any): Observable<any>{
    return this.http.get<any>("http://localhost:3000/bills/"+id);
  }

  getBill(id:any, stats: any): Observable<any>{
    return this.http.get<any>("http://localhost:3000/bills/"+id+"/"+stats);
  }

  postBills(obj: any): Observable<any>{
    return this.http.post<any>("http://localhost:3000/bills/paybills",obj);
  }
}
