import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  private buttonTxt:string;
  private styleTxt: string;

  constructor() { }

  // Use this if we want the parent listen to children events
  @Output() onClicked = new EventEmitter<boolean>();
  
  @Input()
  set text(txt: string){
    this.buttonTxt = txt || "Default";
  }

  get text(){
    return this.buttonTxt;
  }

  // Button css set styling
  @Input()
  set tone(txt: string){
    console.log(txt);
    this.styleTxt = txt || "grey";
  }

  get tone(){
    return this.styleTxt;
  }

  // Use this if we want the parent listen to children events
  clicked(val: boolean){
    this.onClicked.emit(val);
  }

  ngOnInit() {
    
  }

}
