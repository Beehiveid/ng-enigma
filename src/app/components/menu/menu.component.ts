import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router }      from '@angular/router';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  activeMenu: string;
  avatar: string;
  avatarUrl: string;

  constructor(public authService: AuthService, public router: Router) { 
    this.avatarUrl = "../assets/img/user/";
  }

  ngOnInit() {
    this.verify();
    this.setActiveMenu();
  }

  setActiveMenu(){
    this.activeMenu = this.router.url;
  }

  verify(){
    this.authService.verify().subscribe(
      result => {
        console.log(result);
        
        this.isLoggedIn = this.authService.isLoggedIn;
        this.username = this.authService.loggedUser.fullname?this.authService.loggedUser.fullname: null;
        this.avatar = this.authService.loggedUser.avatar?this.authService.loggedUser.avatar: "user.png";
      }
    );
  }

  logout(){
    this.authService.logout();
    this.verify();
    let redirect = '/';
    this.router.navigate([redirect]);
  }
}
