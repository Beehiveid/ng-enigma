import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { BillsService } from "./bills.service";
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [BillsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
