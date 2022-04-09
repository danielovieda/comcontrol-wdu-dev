import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmodalComponent } from './viewmodal.component';

describe('ViewmodalComponent', () => {
  let component: ViewmodalComponent;
  let fixture: ComponentFixture<ViewmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
