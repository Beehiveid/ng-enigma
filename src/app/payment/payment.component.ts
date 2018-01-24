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
  customerName: string;
  accountType: string;
  list:any;

  constructor(private _bills : BillsService) { }

  ngOnInit() {
    this.accountType = "telepon";
  }

  queryData(){
    console.log(this.accountType+" : "+ this.customerId);
    this._bills.getBill(this.customerId).subscribe(
      result => {
        this.list = result;
        console.log(this.list);
      }
    );
    
    //this.customerName = this.list(0).NAMA_PELANGGAN;
    this.customerId = "";
    this.accountType = "telepon";

    
  }

}
