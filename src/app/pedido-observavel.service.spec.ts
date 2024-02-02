import { TestBed } from '@angular/core/testing';

import { PedidoObservavelService } from './pedido-observavel.service';

describe('PedidoObservavelService', () => {
  let service: PedidoObservavelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoObservavelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
