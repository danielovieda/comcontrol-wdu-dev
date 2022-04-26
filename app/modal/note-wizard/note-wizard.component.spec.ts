import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteWizardComponent } from './note-wizard.component';

describe('NoteWizardComponent', () => {
  let component: NoteWizardComponent;
  let fixture: ComponentFixture<NoteWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteWizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
