import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    id: 0,
    name: '',
    company: '',
    email: '',
    contact: '',
    designation: '',
    avatar: ''
  };
  mode: 'add' | 'edit' | 'view' = 'add';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const url = this.router.url;

    if (url.includes('view')) {
      this.mode = 'view';
    } else if (url.includes('edit')) {
      this.mode = 'edit';
    } else {
      this.mode = 'add';
    }

    if (idParam) {
      const id = Number(idParam);
      this.employeeService.getEmployeeById(id).subscribe(emp => {
        if (emp) {
          this.employee = { ...emp };
        }
      });
    } else {
      this.generateRandomAvatar();
    }
  }

  generateRandomId() {
    this.employee.id = Math.floor(Math.random() * (20 - 20000 + 1)) + 20;
  }

  editEmployee() {
    if (this.mode === 'edit') {
      this.employeeService.updateEmployee(this.employee);
      this.router.navigate(['employees/list']);
    }
  }

  addEmployee(){
    this.employeeService.addEmployee(this.employee);
    this.router.navigate(['employees/list']);
  }

  generateRandomAvatar() {
    this.employee.avatar =`https://ui-avatars.com/api/?name=${this.employee.name}&background=random`;
  }

  save() {
    if (this.mode === 'edit') {
      this.editEmployee();
    } 
    else if(this.mode === 'add'){
      this.generateRandomId();
      this.generateRandomAvatar();
      this.addEmployee();
    }
    else {
      this.router.navigate(['/employees/list']);
    }
  }

  goBack() {
    this.router.navigate(['/employees/list']);
  }
}
