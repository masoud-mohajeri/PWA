import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeApisPageComponent } from './native-apis-page.component';

describe('NativeApisPageComponent', () => {
  let component: NativeApisPageComponent;
  let fixture: ComponentFixture<NativeApisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NativeApisPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NativeApisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
