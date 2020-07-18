import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicinesComponent } from './Components/medicines/medicines.component';
import { MedicineService } from './Service/medicine.service';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';


const routes: Routes = [
  {path: 'Home', component: MedicinesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: MedicinesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
