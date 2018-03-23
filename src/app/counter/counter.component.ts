import { Component, OnInit } from '@angular/core';
import { String } from 'typescript-string-operations';
import { BillsService } from "../bills.service";
import { Bills } from "../bills.enum";
import { trigger, style, animate, transition, keyframes, query, stagger } from "@angular/animations";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
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
    ]),
    trigger('shake', [
      transition('* => error',[
        animate(400, keyframes([
          style({transform: 'translate(30px)', offset: 0}),
          style({transform: 'translate(-30px)', offset: .2}),
          style({transform: 'translate(15px)', offset: .4}),
          style({transform: 'translate(-15px)', offset: .6}),
          style({transform: 'translate(8px)', offset: .8}),
          style({transform: 'translate(0px)', offset: 1}),
        ]))
      ])
    ])
  ]
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
        this.error.state = "error";
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
          this.error.state = "noerror";
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
