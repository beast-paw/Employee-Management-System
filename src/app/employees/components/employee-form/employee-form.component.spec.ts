import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { EmployeeFormComponent } from './employee-form.component';
import { EmployeeService } from '../../services/employee.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let mockEmployeeService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockEmployeeService = {
      getEmployeeById: jasmine.createSpy('getEmployeeById').and.returnValue(of({
        id: 1,
        name: 'John Doe',
        company: 'Infrrd',
        email: 'john@infrrd.com',
        contact: '1234567890',
        designation: 'Engineer',
        avatar: ''
      })),
      updateEmployee: jasmine.createSpy('updateEmployee'),
      addEmployee: jasmine.createSpy('addEmployee')
    };

    mockRouter = {
      url: '/employees/edit/1',
      navigate: jasmine.createSpy('navigate')
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => '1'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [EmployeeFormComponent],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should detect edit mode and load employee data', () => {
    expect(component.mode).toBe('edit');
    expect(mockEmployeeService.getEmployeeById).toHaveBeenCalledWith(1);
    expect(component.employee.name).toBe('John Doe');
  });

  it('should call updateEmployee and navigate on save in edit mode', () => {
    component.mode = 'edit';
    component.save();
    expect(mockEmployeeService.updateEmployee).toHaveBeenCalledWith(component.employee);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['employees/list']);
  });

  it('should call addEmployee and navigate on save in add mode', () => {
    mockRouter.url = '/employees/add';
    component.mode = 'add';
    component.employee.name = 'Jane Smith';
    component.save();
    expect(mockEmployeeService.addEmployee).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['employees/list']);
  });
});
