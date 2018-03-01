import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router }      from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  activeMenu: string;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.username = this.authService.loggedUser.username;
    this.setActiveMenu(this.router.url);
  }

  setActiveMenu(url: string){
    console.log(url);
    this.activeMenu = url;
  }



}
