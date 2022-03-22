import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent   {

  
  changeDriverForm: FormGroup
  selectedData: any = {}

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.changeDriverForm = new FormGroup({
        driverId: new FormControl()
      })
     }

  onNoClick(vehicleId: string): void {
    let driverField = this.selectedData.text
    if (driverField == 'Remove Driver') {
      driverField = ""
    }
    this.dialogRef.close({
      driverId: this.changeDriverForm.get('driverId').value,
      vehicleId: vehicleId,
      driver: driverField
    });
  }


  selectedValue(event: MatSelectChange) {
    this.selectedData = {
      value: event.value,
      text: event.source.triggerValue
    };
    console.log(this.selectedData);
  }
}

