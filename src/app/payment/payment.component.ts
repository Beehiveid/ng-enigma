import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

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

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.accountType = "telepon";
    this._data.goal.subscribe(res => this.goals = res );
    this._data.changeGoal(this.goals);
  }

  queryData(){
    this.goals.push(this.customerId);
    
    console.log(this.accountType+" : "+ this.customerId);
    this.customerId = "";
    this.accountType = "telepon";
    this._data.changeGoal(this.goals);
  }

}
