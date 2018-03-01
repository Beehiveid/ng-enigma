import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';

const routes: Routes = [
  {
    path: "",
    component: PaymentComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "counter",
    component: CounterComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
