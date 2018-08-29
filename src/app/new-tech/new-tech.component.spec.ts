import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTechComponent } from './new-tech.component';

describe('NewTechComponent', () => {
  let component: NewTechComponent;
  let fixture: ComponentFixture<NewTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
