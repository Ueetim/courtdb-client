import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HotToastModule } from '@ngneat/hot-toast';
import { IonicModule } from '@ionic/angular';
import {CookieService} from 'ngx-cookie-service';
import {NgxPaginationModule} from 'ngx-pagination';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    IonicModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas:   [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
