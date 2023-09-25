import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewRecordComponent } from './new-record/new-record.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'create', component: NewRecordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
