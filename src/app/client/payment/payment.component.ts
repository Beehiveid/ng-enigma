import { Component, OnInit } from '@angular/core';
import { BillsService } from "../../bills.service";
import { Bills } from '../../bills.enum';
import { isNumber } from 'util';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  customerId: any;
  accountType: string;
  list:any;
  obj = [];
  total: number;
  modal: boolean;
  notification: boolean;
  bills: any;
  error: any;

  constructor(private _bills : BillsService) { }

  ngOnInit() {
    this.accountType = "telepon";
    this.modal = false;
    this.notification = false;
    this.customerId = null;
    this.bills = {};
    this.error = {};
  }

  queryData(){
    this.bills = {};
    let el = document.getElementById("custId");
    try {
      if(String.IsNullOrWhiteSpace(this.customerId)){
        this.customerId = null;
        this.error.message = "Masukkan ID konsumen anda";
        el.classList.add("error");
        throw({"message":"Costumer ID tidak boleh kosong"});
      }else{
        this._bills.getUnpaidBill(this.customerId).subscribe(
          result => {
            if(result.idle != undefined){
              this.bills = result;
              console.log(result);
              this.error = {};
              el.classList.remove("error"); 
            }else{
              this.error.message = "ID konsumen tidak terdaftar";
              el.classList.add("error");
            }
          }
        );
      this.customerId = null;
      this.accountType = "telepon";
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  queueBills(){
    let idx = [];
    for(let i = 0; i < this.bills.idle.length; i++){
      idx.push(this.bills.idle[i].ID_TAGIHAN);
    }

    let obj = {
      "id" : idx,
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
    this.bills = {};
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
