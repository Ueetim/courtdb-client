import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewRecordComponent } from './new-record/new-record.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfileComponent } from './profile/profile.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { DiscoverComponent } from './discover/discover.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    NewRecordComponent,
    ProfileComponent,
    DiscoverComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule
  ]
})
export class AppModule { }
