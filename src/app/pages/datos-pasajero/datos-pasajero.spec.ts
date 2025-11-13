import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPasajero } from './datos-pasajero';

describe('DatosPasajero', () => {
  let component: DatosPasajero;
  let fixture: ComponentFixture<DatosPasajero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosPasajero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPasajero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
