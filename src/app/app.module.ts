import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OneTimePasswordComponent } from './one-time-password/one-time-password.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    OneTimePasswordComponent,
    TimerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: 'apiBaseUrl',
      useValue: 'https://localhost:443',
    },
    {
      provide: 'apiEndpoint',
      useValue: 'https://localhost:443/api', // Adjust the API endpoint accordingly
    },
    {
      provide: 'apiCert',
      useValue: '/assets/certificates/local-cert.der', // Path to your certificate file
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
