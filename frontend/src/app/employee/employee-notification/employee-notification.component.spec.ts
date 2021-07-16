import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNotificationComponent } from './employee-notification.component';

describe('EmployeeNotificationComponent', () => {
  let component: EmployeeNotificationComponent;
  let fixture: ComponentFixture<EmployeeNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
