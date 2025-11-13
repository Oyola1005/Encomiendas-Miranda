import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisViajes } from './mis-viajes';

describe('MisViajes', () => {
  let component: MisViajes;
  let fixture: ComponentFixture<MisViajes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisViajes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisViajes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
