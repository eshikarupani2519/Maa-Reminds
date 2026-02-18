import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedDosageComponent } from './missed-dosage.component';

describe('MissedDosageComponent', () => {
  let component: MissedDosageComponent;
  let fixture: ComponentFixture<MissedDosageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MissedDosageComponent]
    });
    fixture = TestBed.createComponent(MissedDosageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
