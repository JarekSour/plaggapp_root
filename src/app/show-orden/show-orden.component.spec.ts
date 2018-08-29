import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrdenComponent } from './show-orden.component';

describe('ShowOrdenComponent', () => {
  let component: ShowOrdenComponent;
  let fixture: ComponentFixture<ShowOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
