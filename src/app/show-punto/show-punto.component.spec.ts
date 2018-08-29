import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPuntoComponent } from './show-punto.component';

describe('ShowPuntoComponent', () => {
  let component: ShowPuntoComponent;
  let fixture: ComponentFixture<ShowPuntoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPuntoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
