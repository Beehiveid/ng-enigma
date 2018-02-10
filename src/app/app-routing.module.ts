import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "",
    component: PaymentComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
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
