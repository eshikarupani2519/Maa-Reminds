import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPWComponent } from './forgot-pw.component';

describe('ForgotPWComponent', () => {
  let component: ForgotPWComponent;
  let fixture: ComponentFixture<ForgotPWComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPWComponent]
    });
    fixture = TestBed.createComponent(ForgotPWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
