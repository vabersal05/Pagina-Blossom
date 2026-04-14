import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloreriaComponent } from './floreria';

describe('FloreriaComponent', () => {
  let component: FloreriaComponent;
  let fixture: ComponentFixture<FloreriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloreriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloreriaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});