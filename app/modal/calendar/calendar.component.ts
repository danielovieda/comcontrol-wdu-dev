import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarModalComponent implements OnInit {
  selected: any
  passdownButtons: boolean = false

  constructor(public dialogRef: MatDialogRef<CalendarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.passdownDate) this.passdownButtons = true
  }

  save() {
    this.dialogRef.close({
      date: this.selected
    })
  }

}
