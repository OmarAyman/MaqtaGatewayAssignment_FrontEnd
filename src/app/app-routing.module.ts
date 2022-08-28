import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { LoginComponent } from './Component/login/login.component';
import { EmployeesComponent } from './Component/employees/employees.component';
import { AuthGuard } from './guards/auth-guard.service';

 //all components routes
 const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'employee', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})





export class AppRoutingModule { 


 
}
