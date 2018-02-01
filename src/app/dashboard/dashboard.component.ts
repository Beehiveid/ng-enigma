import { Component, OnInit } from '@angular/core';
import { BillsService } from "../bills.service";

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
      console.log(result);
      this.queuedBills = result;
    });
  }

}
