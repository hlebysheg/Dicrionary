import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrnCrossComponent } from './brn-cross.component';

describe('BrnCrossComponent', () => {
  let component: BrnCrossComponent;
  let fixture: ComponentFixture<BrnCrossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrnCrossComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrnCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
