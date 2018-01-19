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
}
