import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-wizard',
  templateUrl: './note-wizard.component.html',
  styleUrls: ['./note-wizard.component.scss']
})
export class NoteWizardComponent implements OnInit {
  @Input() vehicle: any
  @Input() vehicleList: any


  constructor() { }

  ngOnInit(): void {
  }

}
