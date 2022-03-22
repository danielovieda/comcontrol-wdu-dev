import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassdownComponent } from './passdown.component';

describe('PassdownComponent', () => {
  let component: PassdownComponent;
  let fixture: ComponentFixture<PassdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
