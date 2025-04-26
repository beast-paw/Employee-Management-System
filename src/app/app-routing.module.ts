import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/components/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'employees/list', pathMatch: 'full' },
  {
    path: 'employees/list',
    // component: EmployeeListComponent
    loadChildren: () =>
      import('./employees/employees.module').then((m) => m.EmployeesModule),
  },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}