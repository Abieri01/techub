import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosSuportePage } from './pedidos-suporte.page';

describe('PedidosSuportePage', () => {
  let component: PedidosSuportePage;
  let fixture: ComponentFixture<PedidosSuportePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidosSuportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
