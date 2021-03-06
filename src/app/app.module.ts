import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PaymentComponent } from './client/payment/payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { BillsService } from "./bills.service";
import { ClientHeaderComponent } from './client/header/header.component';
import { ClientFooterComponent } from './client/footer/footer.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { String, StringBuilder } from "typescript-string-operations";
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    DashboardComponent,
    ClientHeaderComponent,
    ClientFooterComponent,
    HomeComponent,
    CounterComponent,
    LoginComponent,
    MenuComponent,
    HeaderComponent,
    BreadcrumbComponent,
    ButtonComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [BillsService, AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
