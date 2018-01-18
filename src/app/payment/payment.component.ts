import { Component, OnInit } from '@angular/core';
import { BillsService } from "../bills.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  checkBtnTxt: string = "CEK"; 
  customerId: string;
  accountType: string;

  constructor(private _bills : BillsService) { }

  ngOnInit() {
    this.accountType = "telepon";
  }

  queryData(){
    console.log(this.accountType+" : "+ this.customerId);
    this.customerId = "";
    this.accountType = "telepon";
    
  }

}
