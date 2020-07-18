import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { MedicineComponent } from './Component/medicine/medicine.component';
import { AuthGardGuard } from './Component/auth-gard.guard';


const routes: Routes = [
  {path: 'Home', component: MedicineComponent, canActivate: [AuthGardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: MedicineComponent, canActivate: [AuthGardGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
