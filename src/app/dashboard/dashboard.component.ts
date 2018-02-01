import { Component, OnInit } from '@angular/core';
import { BillsService } from "../bills.service";
import { isEmpty } from 'rxjs/operators/isEmpty';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bills: any;
  userId: any;
  queuedBills: any;

  constructor(private _bills : BillsService) { }

  ngOnInit() {
    this.queuedBills = null;
  }

  getBills(){
    this._bills.getBills()
    .subscribe(result =>{
      this.bills = result;
      console.log("this.bills"+this.bills);
    });
  }

  getQueuedBills(){
    this.queuedBills = [];
    this._bills.getQueuedBill(this.userId, 9)
    .subscribe(result => {
      this.queuedBills = result;
    });
  }

}
