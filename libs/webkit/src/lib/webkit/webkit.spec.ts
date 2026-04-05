import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Webkit } from './webkit';

describe('Webkit', () => {
  let component: Webkit;
  let fixture: ComponentFixture<Webkit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Webkit],
    }).compileComponents();

    fixture = TestBed.createComponent(Webkit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
