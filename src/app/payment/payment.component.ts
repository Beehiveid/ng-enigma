import { Component, OnInit } from '@angular/core';
import { BillsService } from "../bills.service";
import { Bills } from '../bills.enum';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  customerId: string;
  customerName: string;
  accountType: string;
  list:any;
  obj = [];
  total: number;
  modal: boolean;
  idx = [];
  notification: boolean;

  constructor(private _bills : BillsService) { }

  ngOnInit() {
    this.accountType = "telepon";
    this.total = 0;
    this.modal = false;
    this.notification = false;
  }

  queryData(){
    this.modal = true;
    this._bills.getBill(this.customerId).subscribe(
      result => {
        this.list = result;
        this.total = 0;
        this.idx = [];
        for(let data of this.list){
          this.idx.push(data.ID_TAGIHAN);
          this.total += data.HARGA;
        }
      }
    );
    
    this.customerId = "";
    this.accountType = "telepon";
  }

  queueBills(){
    let obj = {
      "id" : this.idx,
      "status" : Bills.QUEUED
    }
    this._bills.postBills(obj).subscribe(
      result => {
        if(result.affectedRows > 0 && result.warningCount == 0){
          this.showNotification(1);
        }else{
          this.showNotification(0);
        }
      }
    );
  }

  closeModal(){
    this.modal = false;
    this.notification = false;
  }

  showNotification(stats: number){
    this.modal = false;
    if(stats == 1){
      this.notification = true;
    }else{
      this.notification = false;
    }
  }
}
