import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewRecordComponent } from './new-record/new-record.component';
import { ProfileComponent } from './profile/profile.component';
import { DiscoverComponent } from './discover/discover.component';
import { RecordDetailComponent } from './record-detail/record-detail.component';
import { UpdateRecordComponent } from './update-record/update-record.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'create', component: NewRecordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'record/update/:id', component: UpdateRecordComponent },
  { path: 'record/:id', component: RecordDetailComponent },
  { path: 'record/public/:id', component: RecordDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
