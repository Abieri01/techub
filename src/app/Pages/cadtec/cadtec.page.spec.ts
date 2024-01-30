import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadtecPage } from './cadtec.page';

describe('CadtecPage', () => {
  let component: CadtecPage;
  let fixture: ComponentFixture<CadtecPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadtecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
