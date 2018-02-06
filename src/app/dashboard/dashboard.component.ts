import { Component, OnInit } from '@angular/core';
import { BillsService } from "../bills.service";
import { trigger, style, animate, transition, keyframes, query, stagger } from "@angular/animations";

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
        query(':leave', stagger('50ms', [
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
  notification: boolean;

  constructor(private _bills : BillsService) { }

  ngOnInit() {
    this.queuedBills = null;
  }

  getBills(){
    this._bills.getBills()
    .subscribe(result =>{
      this.bills = result;
      console.log("this.bills"+this.bills);
    });
  }

  getQueuedBills(){
    this.queuedBills = [];
    let id = this.userId.trim();
    this._bills.getQueuedBill(id, 9)
    .subscribe(result => {
      this.queuedBills = result;
    });
  }

  showModal(stats: boolean){
    console.log(stats);
    this.notification = true;
    if(stats){
      console.log("Queued bills dilunasi");
    }else{
      console.log("Queued bills dibatalkan");
    }
  }

  closeModal(){
    this.notification = false;
  }

  removeItem(index){
    this.queuedBills.details.splice(index, 1);
  }

}
