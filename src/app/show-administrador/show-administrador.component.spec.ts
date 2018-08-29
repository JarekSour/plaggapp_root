import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdministradorComponent } from './show-administrador.component';

describe('ShowAdministradorComponent', () => {
  let component: ShowAdministradorComponent;
  let fixture: ComponentFixture<ShowAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
