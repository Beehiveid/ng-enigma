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
  goals = [];

  constructor() { }

  ngOnInit() {
    this.accountType = "telepon";
  }

  queryData(){
    this.goals.push(this.customerId);
    
    console.log(this.accountType+" : "+ this.customerId);
    this.customerId = "";
    this.accountType = "telepon";
    
  }

}
