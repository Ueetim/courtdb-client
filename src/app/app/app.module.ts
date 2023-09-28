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
import { RecordDetailComponent } from './record-detail/record-detail.component';
import { QuillModule } from 'ngx-quill';
import { UpdateRecordComponent } from './update-record/update-record.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    NewRecordComponent,
    ProfileComponent,
    DiscoverComponent,
    RecordDetailComponent,
    UpdateRecordComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    QuillModule.forRoot({
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    }),
  ]
})
export class AppModule { }
