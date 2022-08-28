import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employees } from '../Model/Employee';
import * as configurl from '../../assets/Config/config.json'
let intermediateJson = configurl

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  url = intermediateJson.apiServer.url + '/api/employee/';
  constructor(private http: HttpClient) { }
  getEmployeeList(): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.url + 'EmployeesList');
  }
  postEmployeeData(EmployeeData: Employees): Observable<Employees> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Employees>(this.url + 'CreateEmployee', EmployeeData, httpHeaders);
  }
  updateEmployee(Employee: Employees): Observable<Employees> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Employees>(this.url + 'UpdateEmployee?id=' + Employee.employeeId, Employee, httpHeaders);
  }
  deleteEmployeeById(id: number): Observable<number> {
    return this.http.post<number>(this.url + 'DeleteEmployee?id=' + id, null);
  }
  getEmployeeDetailsById(id: string): Observable<Employees> {
    return this.http.get<Employees>(this.url + 'EmployeeDetail?id=' + id);
  }
}