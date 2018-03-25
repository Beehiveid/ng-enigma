import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  private buttonTxt:string;
  private styleTxt: string;

  constructor() { }

  

  @Input()
  set text(txt: string){
    this.buttonTxt = txt || "Default";
  }

  get text(){
    return this.buttonTxt;
  }

  @Input()
  set tone(txt: string){
    console.log(txt);
    this.styleTxt = txt || "grey";
  }

  get tone(){
    return this.styleTxt;
  }

  @Input()
  set shape(txt: string){
    console.log(txt);
    this.styleTxt += " "+txt;
  }

  get shape(){
    return this.styleTxt;
  }

  ngOnInit() {
    
  }

}
