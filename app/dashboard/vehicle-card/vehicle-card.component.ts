import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from 'src/app/modal/modal.component';
import { AddNoteComponent } from 'src/app/modal/add-note/add-note.component';
import { DatePipe } from '@angular/common';
import { Router, NavigationExtras, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ViewmodalComponent } from 'src/app/view/viewmodal/viewmodal.component';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent implements OnInit {

  
  timestamp: any

  constructor(private service: BackendService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private router: Router,
    private userService: UserService) { }

  @Input() data: any
  @Input() driverList: any
  @Input() mini: boolean

  ngOnInit(): void {
    
  }

  showVehicleDialog(vehicleId: string): void {
    console.log('which vehicle ', vehicleId)
    const dialogRef = this.dialog.open(ViewmodalComponent, {
      data: { vehicle: vehicleId}
    });
  }

   

  changeDriverDialog(vehicleId: string): void {

    

    

    const dialogRef = this.dialog.open(ModalComponent, {
      data: { driver: this.driverList, vehicle: vehicleId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateDriver(result);
    });
  }

  updateDriver(data: any) {
    if (!data) {
      
      return
    }
    let payload = { _id: data.vehicleId, defaultDriverId: data.driverId, defaultDriver: data.driver }
   
     this.service.updateVehicle(payload).subscribe(
       response => this.toastr.success(response.success)
     )

     setTimeout(() => {
      location.reload()
    }, 1000);

  }



  addNoteDialog(vehicleId: string, number: string): void {

    

    

    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: { vehicle: vehicleId, number: number }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveNote(result);
    });
  }


  saveNote(data: any) {
    if (!data) {
      
      return
    }

    this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

    let payload = {
      vehicleId: data.vehicleId,
      number: data.number,
      timestamp: this.timestamp,
      userId: this.userService.getUserId(),
      username: this.userService.getUser(),
      status: 'open',
      type: data.type,
      note: data.note
    }

 

    this.service.addNote(payload).subscribe(
      response => this.toastr.success(response.success)
    )

  }
 

  updateStatus(vehicleId: string, status: string) {
    

    let payload = {
      _id: vehicleId,
      status: status
    }
    this.service.updateVehicle(payload).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          

          this.service.addVehicleHistory(vehicleId, `Changed status to: ${status}`).subscribe(
            response => {
              if (response) {
                console.log(`Successfully saved history on ${vehicleId}: ${response.success}`)
              }
            }
          )
          //this.reload()
        } else {
          this.toastr.error('An error occurred. Try again.')
        }
      } 
    )


  }
  

  reload() {
    setTimeout(() => {
      location.reload()
    }, 1700);
  }
  

}
