import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Selectcomponent } from './select';

describe('Selectcomponent', () => {
  let component: Selectcomponent;
  let fixture: ComponentFixture<Selectcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Selectcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Selectcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
