import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnotesComponent } from './viewnotes.component';

describe('ViewnotesComponent', () => {
  let component: ViewnotesComponent;
  let fixture: ComponentFixture<ViewnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewnotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
