import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteCard } from './pallete-card';

describe('PaletteCard', () => {
  let component: PaletteCard;
  let fixture: ComponentFixture<PaletteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletteCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PaletteCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
