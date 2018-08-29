import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrdenComponent } from './new-orden.component';

describe('NewOrdenComponent', () => {
  let component: NewOrdenComponent;
  let fixture: ComponentFixture<NewOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
