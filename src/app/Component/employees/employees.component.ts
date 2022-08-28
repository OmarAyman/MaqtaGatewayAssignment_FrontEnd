import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeesService } from '../../Service/employee.service';
import { Employees } from '../../Model/Employee';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employeeList?: Observable<Employees[]>;
  employeeList1?: Observable<Employees[]>;
  employeeForm: any;
  massage = "";
  prodCategory = "";
  employeeId = 0;
  constructor(private formbulider: FormBuilder,
     private employeeService: EmployeesService,private router: Router,
     private jwtHelper : JwtHelperService,private toastr: ToastrService) { }

  ngOnInit() {
    this.prodCategory = "0";
    this.employeeForm = this.formbulider.group({
      employeeName: ['', [Validators.required]],
      employeeAddress: ['', [Validators.required]],
      employeeCity: ['', [Validators.required]],
      employeePhone: ['', [Validators.required]],
      employeeGender: ['', [Validators.required]]

    });
    this.getemployeeList();
  }
  getemployeeList() {
    this.employeeList1 = this.employeeService.getEmployeeList();
    this.employeeList = this.employeeList1;
  }
  PostEmployee(employee: Employees) {
    const employee_Master = this.employeeForm.value;
    this.employeeService.postEmployeeData(employee_Master).subscribe(
      () => {
        this.getemployeeList();
        this.employeeForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
  }
  employeeDetailsToEdit(id: string) {
    this.employeeService.getEmployeeDetailsById(id).subscribe(employeeResult => {
      this.employeeId = employeeResult.employeeId;
      this.employeeForm.controls['employeeName'].setValue(employeeResult.employeeName);
      this.employeeForm.controls['employeeAddress'].setValue(employeeResult.employeeAddress);
      this.employeeForm.controls['employeeCity'].setValue(employeeResult.employeeCity);
      this.employeeForm.controls['employeePhone'].setValue(employeeResult.employeePhone);
      this.employeeForm.controls['employeeGender'].setValue(employeeResult.employeeGender);

    });
  }
  UpdateEmployee(employee: Employees) {
    employee.employeeId = this.employeeId;
    const employee_Master = this.employeeForm.value;
    this.employeeService.updateEmployee(employee_Master).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.employeeForm.reset();
      this.getemployeeList();
    });
  }

  DeleteEmployee(id: number) {
    if (confirm('Do you want to delete this employee?')) {
      this.employeeService.deleteEmployeeById(id).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getemployeeList();
      });
    }
  }

  Clear(employee: Employees){
    this.employeeForm.reset();
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}
