import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadTecPage } from './cad-tec.page';

describe('CadTecPage', () => {
  let component: CadTecPage;
  let fixture: ComponentFixture<CadTecPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadTecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
