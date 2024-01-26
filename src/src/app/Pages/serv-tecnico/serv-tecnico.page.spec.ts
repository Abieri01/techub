import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServTecnicoPage } from './serv-tecnico.page';

describe('ServTecnicoPage', () => {
  let component: ServTecnicoPage;
  let fixture: ComponentFixture<ServTecnicoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ServTecnicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
