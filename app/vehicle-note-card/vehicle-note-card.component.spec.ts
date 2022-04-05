import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleNoteCardComponent } from './vehicle-note-card.component';

describe('VehicleNoteCardComponent', () => {
  let component: VehicleNoteCardComponent;
  let fixture: ComponentFixture<VehicleNoteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleNoteCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleNoteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
