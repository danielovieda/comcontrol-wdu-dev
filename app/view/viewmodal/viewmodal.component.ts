import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-viewmodal',
  templateUrl: './viewmodal.component.html',
  styleUrls: ['./viewmodal.component.scss']
})
export class ViewmodalComponent {
  whichVehicle: string

  constructor(public dialogRef: MatDialogRef<ViewmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.whichVehicle = data.vehicle
    }

  
}
