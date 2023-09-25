import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AppGuard } from './guards/app.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate:[AppGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate:[AppGuard] },
  { path: 'app', loadChildren: () => import('./app/app.module').then(m => m.AppModule), canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
