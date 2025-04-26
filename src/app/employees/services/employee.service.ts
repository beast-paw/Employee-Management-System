import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private url = 'assets/data/employee.json';
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<Employee[]>(this.url).subscribe((data) => {
      const updated = data.map(emp => ({
        ...emp,
        avatar:`https://ui-avatars.com/api/?name=${emp.name}&background=random`
      }));
      this.employeesSubject.next(updated);
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return this.employees$.pipe(
      map((employees) => employees.find((e) => e.id === id))
    );
  }

  addEmployee(employee: Employee){
    const updatedList = [employee , ...this.employeesSubject.value];
    this.employeesSubject.next(updatedList);
  }

  deleteEmployee(id: number): void {
    const updatedList = this.employeesSubject.value.filter(emp => emp.id !== id);
    this.employeesSubject.next(updatedList);
  }

  updateEmployee(updatedEmployee: Employee): void {
    const list = this.employeesSubject.value.map(emp =>
      emp.id === updatedEmployee.id ? { ...updatedEmployee } : emp
    );
    this.employeesSubject.next(list);
  }
}
