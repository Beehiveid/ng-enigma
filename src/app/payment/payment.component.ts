import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  dateNow: string = "1.10.2018";
  costumerNumberId: string = "0750xxxxx";
  checkBtnTxt: string = "CEK"; 

  constructor() { }

  ngOnInit() {
  }

}
