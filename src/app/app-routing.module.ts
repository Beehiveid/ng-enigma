import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './client/payment/payment.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "client",
    component: PaymentComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "counter",
    component: CounterComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: '**',
    component: PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
