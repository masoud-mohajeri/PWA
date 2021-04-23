import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CachePageComponent } from './cache-page.component';

describe('CachePageComponent', () => {
  let component: CachePageComponent;
  let fixture: ComponentFixture<CachePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CachePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CachePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
