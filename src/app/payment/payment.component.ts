import { Component, OnInit } from '@angular/core';
import { BillsService } from "../bills.service";
import { log } from 'util';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  checkBtnTxt: string = "CEK"; 
  customerId: string;
  customerName: string;
  accountType: string;
  list:any;
  obj = [];
  total: number;

  constructor(private _bills : BillsService) { }

  ngOnInit() {
    this.accountType = "telepon";
    this.customerId = "1119293002";
    this.total = 0;
  }

  queryData(){
    console.log(this.accountType+" : "+ this.customerId);
    this._bills.getBill(this.customerId).subscribe(
      result => {
        this.list = result;
        this.total = 0;
        for(let data of this.list){
          this.total += data.HARGA;
        }
      }
    );
    
    this.customerId = "";
    this.accountType = "telepon";
  }
}
