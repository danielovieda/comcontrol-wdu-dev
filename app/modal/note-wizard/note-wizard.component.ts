import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-wizard',
  templateUrl: './note-wizard.component.html',
  styleUrls: ['./note-wizard.component.scss']
})
export class NoteWizardComponent implements OnInit {
  @Input() vehicle: any
  @Input() vehicleList: any

  changeStatus: boolean = false
  changeLocation: boolean = false



  constructor() { }

  ngOnInit(): void {
  }

  toggleStatus() {
    this.changeStatus = !this.changeStatus
    console.log(this.changeStatus)
  }

  toggleLocation() {
    this.changeLocation = !this.changeLocation
    console.log(this.changeLocation)
  }

}
