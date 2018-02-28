import { Component, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { BillsService } from "../bills.service";
import { Bills } from "../bills.enum";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  message: String;
  error: any;
  userId: any;
  queuedBills: any;
  lastId: any;

  constructor(private _bills : BillsService) { 

  }

  ngOnInit() {
    this.message = null;
    this.error = {};
  }

  getQueuedBills(){
    let el = document.getElementById("custId");
    try {
      if(String.IsNullOrWhiteSpace(this.userId)){
        
        this.userId = null;
        this.error.message = "Masukkan ID konsumen";
        this.queuedBills = {};
        this.message = null;
        el.classList.add("error");
        throw("Customer ID tidak boleh kosong")
      }else{
        if(this.userId === this.lastId){
          throw("ID sama");
        }
        this.queuedBills = {};
        let id = this.userId.trim();
        this._bills.getBill(id, Bills.QUEUED)
        .subscribe(result => {
          this.queuedBills = result;

          this.error = {};
          this.message = null;
          el.classList.remove("error");
          this.lastId = this.userId;
          if(this.queuedBills.details == undefined){
            this.message = "Tidak ada antrian untuk ID " + id;
          }
        });
      }
    } catch (error) {
      console.log(error);
      
    }
    
  }

}
