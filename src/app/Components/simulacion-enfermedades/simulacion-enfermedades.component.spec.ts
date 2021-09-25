import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionEnfermedadesComponent } from './simulacion-enfermedades.component';

describe('SimulacionEnfermedadesComponent', () => {
  let component: SimulacionEnfermedadesComponent;
  let fixture: ComponentFixture<SimulacionEnfermedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulacionEnfermedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionEnfermedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
