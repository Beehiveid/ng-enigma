import { Component, OnInit } from '@angular/core';
import { BillsService } from "../bills.service";
import { trigger, style, animate, transition, keyframes, query, stagger } from "@angular/animations";
import { Bills } from "../bills.enum";
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('bills',[
      transition('* => *', [
        query(':enter', style({ opacity : 0 }), { optional : true }),
        query(':enter', stagger('100ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateX(-20%)', offset: 0}),
            style({ opacity: .5, transform: 'translateX(10px)', offset: .3}),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1}),
          ]))]), { optional : true }),
        query(':leave', stagger('0ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0}),
            style({ opacity: 0, transform: 'translateX(-20%)', offset: 1}),
          ]))]), { optional : true }),
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  bills: any;
  userId: any;
  queuedBills: any;
  message: String;
  error: any;
  lastId: any;

  constructor(private _bills : BillsService) { }

  ngOnInit() {
    this.queuedBills = {};
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

  showModal(stats: boolean){
    let idx = [];
    for(let i = 0; i < this.queuedBills.details.length; i++){
      idx.push(this.queuedBills.details[i].ID_TAGIHAN);
    }
    console.log(stats);
    if(stats){
      console.log("Queued bills dilunasi");
      this.payQueuedBills(idx, Bills.PAID);
    }else{
      console.log("Queued bills dibatalkan");
      this.payQueuedBills(idx, Bills.IDLE);
    }
  }

  removeItem(index){
    this.queuedBills.details.splice(index, 1);
  }

  payQueuedBills(idx, stats){
    let obj = {
      "id": idx,
      "status": stats
    }

    this._bills.postBills(obj).subscribe(
      result => {
        console.log(result);
        if((result.affectedRows > 0) && (result.warningCount == 0))
        {
          this.queuedBills = {};
        }

        if(stats == Bills.PAID){
          this.message = "Pembayaran tagihan berhasil";
        }else{
          this.message = "Pembayaran tagihan dibatalkan";
        }
      }
    );
  }
}
