import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { PageNotFoundComponent } from './helper/pages/page-not-found/page-not-found.component';
import { AuthGuard } from './helper/guards/auth.guard';
import { HomeComponent } from './payment/pages/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/paymentdetails', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'paymentdetails', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
