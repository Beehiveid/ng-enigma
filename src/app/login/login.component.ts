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
    this.setMessage();
   }

  ngOnInit() {
    console.log(this.router.url);
    
  }

  setMessage(){
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in':'out');
  }

  login(){
    this.message = 'Trying to log in ...';
    console.log(this.employeeId);
    console.log(this.passKey);
    
    this.authService.login(this.employeeId, this.passKey).subscribe(
      result => {
        console.log(result);
        this.authService.loggedUser = result;
        this.authService.isLoggedIn = result.login;
        
        if (this.authService.isLoggedIn) {
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
          this.router.navigate([redirect]);
        }else{
          this.message = result.message;
        }
      }
    );
  }

  logout(){
    this.authService.logout();
    this.setMessage();
  }
}
