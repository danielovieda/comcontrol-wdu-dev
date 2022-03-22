import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { MatSelectChange } from '@angular/material/select';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent  {

  addNoteForm: FormGroup
  type: string
  pinned: boolean = false
  timestamp: any
  selectedData: any = {}
  selectedRouteData: any = {}
  notValidError: string = "Ensure form is valid."
  

  constructor(private userService: UserService, private datepipe: DatePipe, public dialogRef: MatDialogRef<AddNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) {

      console.log('whats the data?')
      console.log(data)

      if (data.vehicle == '') {

        if (data.type == 'off') {
          console.log('adding off time')
          this.type = 'off'

          this.addNoteForm = new FormGroup ({
            driverList: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            routeList: new FormControl('', Validators.required),
            note: new FormControl('')
          })

        } else if (data.type == 'protection') {
          this.type = 'protection'

          this.addNoteForm = new FormGroup ({
            driverList: new FormControl('', Validators.required),
            routeList: new FormControl('', Validators.required),
            note: new FormControl(''),
            confirmed: new FormControl('')
          })


          console.log('adding protection')
        } else if (data.type == 'pm') {
          this.type = 'pm'

          this.addNoteForm = new FormGroup ({
            vehicleList: new FormControl('', Validators.required),
            note: new FormControl('')
          })

          console.log('adding a pm')
        } else if (data.type == 'note') {
          console.log('adding a passdown DATE note')
          this.type = 'note'
          this.addNoteForm = new FormGroup ({
            style: new FormControl('', Validators.required),
            note: new FormControl('', Validators.required),
            pinned: new FormControl(false)
          })
        } else {

          console.log('vehicle note from passdown page')

          this.type = 'passdown'
  
          this.addNoteForm = new FormGroup({
            vehicleId: new FormControl(''),
            type: new FormControl(''),
            note: new FormControl('', Validators.required),
            pinned: new FormControl('')
    
    
          })

        }
        
        
      } else {

        this.type = 'normal'

        this.addNoteForm = new FormGroup({
          vehicleId: new FormControl(''),
          type: new FormControl('', Validators.required),
          note: new FormControl('', Validators.required),
          
  
  
        })


      }

      
     }


     saveNote(vehicleId: string, number: string) {

      if (!this.addNoteForm.valid) {
        this.toastr.error("Form isn't valid. Please check for errors.")
        return
      }
       
       this.dialogRef.close({
        vehicleId: vehicleId,
        number: number,
         type: this.addNoteForm.get('type').value,
         note: this.addNoteForm.get('note').value,
         pinned: this.pinned
      });

        
     }

     isValid() {
      if (!this.addNoteForm.valid) {
        return false
      } else {
        return true
      }
     }

     saveCallOut() {

      if (!this.isValid()) {
        this.toastr.error(this.notValidError)
        return
      }

      
      this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

      this.dialogRef.close({
         driver: this.selectedData.text,
         driverId: this.addNoteForm.get('driverList').value,
         route: this.selectedRouteData.text,
         routeId: this.addNoteForm.get('routeList').value,
         type: this.addNoteForm.get('type').value,
         note: this.addNoteForm.get('note').value,
         timestamp: this.timestamp,
         user: this.userService.getUser(),
         userId: this.userService.getUserId()
      });
     }

     saveProtection() {
      if (!this.isValid()) {
        this.toastr.error(this.notValidError)
        return
      }

      this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

      this.dialogRef.close({
         uid: uuidv4(),
         driver: this.selectedData.text,
         driverId: this.addNoteForm.get('driverList').value,
         route: this.selectedRouteData.text,
         routeId: this.addNoteForm.get('routeList').value,
         note: this.addNoteForm.get('note').value,
         confirmed: this.addNoteForm.get('confirmed').value,
         timestamp: this.timestamp,
         user: this.userService.getUser(),
         userId: this.userService.getUserId()
      });
     }

     confirmProtection(id: string) {
      this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

       let payload = {
         id: id,
         confirmed: this.timestamp,
         confirmedBy: this.userService.getUser()
       }
     }

     savePm() {
      if (!this.isValid()) {
        this.toastr.error(this.notValidError)
        return
      }

      this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

      this.dialogRef.close({
         vehicle: this.selectedData.text,
         vehicleId: this.addNoteForm.get('vehicleList').value,
         note: this.addNoteForm.get('note').value,
         timestamp: this.timestamp,
         user: this.userService.getUser(),
         userId: this.userService.getUserId()
      });
     }

     savePassdownNote() {
      if (!this.isValid()) {
        this.toastr.error(this.notValidError)
        return
      }

      this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

      this.dialogRef.close({
         noteId: uuidv4(),
         style: this.addNoteForm.get('style').value,
         note: this.addNoteForm.get('note').value,
         pinned: this.addNoteForm.get('pinned').value,
         timestamp: this.timestamp,
         user: this.userService.getUser(),
         userId: this.userService.getUserId()
      });
     }

     togglePin() {
       console.log(this.pinned)
      this.pinned == true ? this.pinned = false : this.pinned = true
     }

     selectedValue(event: MatSelectChange) {
      this.selectedData = {
        value: event.value,
        text: event.source.triggerValue
      };
    }

    selectedRoute(event: MatSelectChange) {
      this.selectedRouteData = {
        value: event.value,
        text: event.source.triggerValue
      };
    }

  

}
