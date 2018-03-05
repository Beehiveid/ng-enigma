import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.verify();
    
  }

  verify(){
    this.authService.verify().subscribe(
      result => {
        this.isLoggedIn = this.authService.isLoggedIn;
      }
    );
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/"]);
  }

}
