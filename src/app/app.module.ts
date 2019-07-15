import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalService } from './services/msal.service';
import { ValidateloginComponent } from './validatelogin/validatelogin.component';

@NgModule({
  declarations: [
    AppComponent,
    ValidateloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MsalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
