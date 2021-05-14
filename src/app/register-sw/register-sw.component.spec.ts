import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSwComponent } from './register-sw.component';

describe('RegisterSwComponent', () => {
  let component: RegisterSwComponent;
  let fixture: ComponentFixture<RegisterSwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
