import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LotsComponent } from './lots/lots.component';
import { LotComponent } from './lot/lot.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'lots', component: LotsComponent },
  { path: 'lot/:id', component: LotComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'lots', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
