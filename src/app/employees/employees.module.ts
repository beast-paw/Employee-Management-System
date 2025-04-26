import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { FormsModule } from '@angular/forms';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeFormComponent],
  imports: [CommonModule, EmployeesRoutingModule, FormsModule],
})
export class EmployeesModule {}