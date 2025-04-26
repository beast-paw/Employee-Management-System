import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeService: jasmine.SpyObj<EmployeeService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployees', 'deleteEmployee']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should display employee information correctly from Employee interface', () => {
    const mockEmployees: Employee[] = [
      {
        id: 1,
        name: 'John Doe',
        company: 'Company A',
        email: 'john.doe@example.com',
        contact: '1234567890',
        designation: 'Software Developer',
        avatar: 'avatar1.jpg'
      }
    ];
    employeeService.getEmployees.and.returnValue(of(mockEmployees));
    component.ngOnInit();
    fixture.detectChanges();
    const employeeCard = fixture.debugElement.query(By.css('.employee-card'));
    expect(employeeCard.nativeElement.textContent).toContain('John Doe');
    expect(employeeCard.nativeElement.textContent).toContain('Software Developer');
    expect(employeeCard.nativeElement.textContent).toContain('Company A');
    expect(employeeCard.nativeElement.textContent).toContain('john.doe@example.com');
    expect(employeeCard.nativeElement.textContent).toContain('1234567890');
    expect(employeeCard.nativeElement.querySelector('img').src).toContain('avatar1.jpg');
  });

  it('should paginate employee list correctly based on the Employee interface', () => {
    const mockEmployees: Employee[] = [
      { id: 1, name: 'John Doe', company: 'Company A', email: 'john.doe@example.com', contact: '1234567890', designation: 'Software Developer', avatar: 'avatar1.jpg' },
      { id: 2, name: 'Jane Doe', company: 'Company B', email: 'jane.doe@example.com', contact: '0987654321', designation: 'Project Manager', avatar: 'avatar2.jpg' },
      { id: 3, name: 'Jim Beam', company: 'Company C', email: 'jim.beam@example.com', contact: '1122334455', designation: 'QA Engineer', avatar: 'avatar3.jpg' },
      { id: 4, name: 'Jack Daniels', company: 'Company D', email: 'jack.daniels@example.com', contact: '5566778899', designation: 'UI/UX Designer', avatar: 'avatar4.jpg' },
      { id: 5, name: 'Jill Stein', company: 'Company E', email: 'jill.stein@example.com', contact: '6677889900', designation: 'HR Manager', avatar: 'avatar5.jpg' },
      { id: 6, name: 'Jake White', company: 'Company F', email: 'jake.white@example.com', contact: '8899001122', designation: 'Sales Executive', avatar: 'avatar6.jpg' }
    ];
    employeeService.getEmployees.and.returnValue(of(mockEmployees));
    component.ngOnInit();
    fixture.detectChanges();
    component.page = 2;
    fixture.detectChanges();
    const employeeCards = fixture.debugElement.queryAll(By.css('.employee-card'));
    expect(employeeCards.length).toBe(1);
  });

  it('should set the correct page when pagination button is clicked', () => {
    const mockEmployees: Employee[] = [
      { id: 1, name: 'John Doe', company: 'Company A', email: 'john.doe@example.com', contact: '1234567890', designation: 'Software Developer', avatar: 'avatar1.jpg' },
      { id: 2, name: 'Jane Doe', company: 'Company B', email: 'jane.doe@example.com', contact: '0987654321', designation: 'Project Manager', avatar: 'avatar2.jpg' }
    ];

    employeeService.getEmployees.and.returnValue(of(mockEmployees));
    component.ngOnInit();
    fixture.detectChanges();

    const paginationButton = fixture.debugElement.query(By.css('.pagination button'));
    paginationButton.triggerEventHandler('click', null);

    expect(component.page).toBe(1); // Check if page is correctly set
  });
});
