import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employeeId: string;
  passKey: string;
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    
   }

  ngOnInit() {
    console.log(this.router.url);
    this.verify();
  }

  login(){
    this.message = 'Trying to log in ...';
    
    this.authService.login(this.employeeId, this.passKey).subscribe(
      res => {
        if (this.authService.isLoggedIn) {
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
          this.router.navigate([redirect]);
        }else{
          this.message = this.authService.message;
        }
      }
    );
  }

  verify(){
    console.log("verify");
    
    this.message = 'Verifying ...';
    
    this.authService.verify().subscribe(
      res => {
        if (this.authService.isLoggedIn) {
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
          this.router.navigate([redirect]);
        }else{
          this.message = this.authService.message;
        }
      }
    );
  }

  logout(){
    this.authService.logout();
  }
}
