import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  checkBtnTxt: string = "CEK"; 
  customerId: string;
  accountType: string;

  constructor() { }

  ngOnInit() {
    this.accountType = "telepon";
  }

  queryData(){
    console.log(this.accountType+" : "+ this.customerId);
    this.customerId = "";
    this.accountType = "telepon";
  }

}
