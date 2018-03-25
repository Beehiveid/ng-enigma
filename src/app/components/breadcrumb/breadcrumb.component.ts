import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
breadcrumb:any;
url:string;

  constructor(public router:Router) { }

  ngOnInit() {
    this.setBreadcrumb();
  }

  setBreadcrumb(){
    let url = (this.router.url == "/")?"/home":this.router.url;
    this.breadcrumb = url.split("/");
    this.breadcrumb.splice(0,1);
  }

}
