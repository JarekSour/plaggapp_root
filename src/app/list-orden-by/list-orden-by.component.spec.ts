import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdenByComponent } from './list-orden-by.component';

describe('ListOrdenByComponent', () => {
  let component: ListOrdenByComponent;
  let fixture: ComponentFixture<ListOrdenByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrdenByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdenByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
