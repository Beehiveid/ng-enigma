import { Component, OnInit } from '@angular/core';
import { BillsService } from "../bills.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  goals: any;
  bills: any;

  constructor(private _bills : BillsService) { }

  ngOnInit() {
    this.getBills();
  }

  getBills(){
    this._bills.getBills()
    .subscribe(result =>{
      this.bills = result;
      console.log("this.bills"+this.bills);
    });
  }

}
