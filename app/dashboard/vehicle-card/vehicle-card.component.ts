import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from 'src/app/modal/modal.component';
import { AddNoteComponent } from 'src/app/modal/add-note/add-note.component';
import { DatePipe } from '@angular/common';
import { Router, NavigationExtras, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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

  ngOnInit(): void {
    
  }

  showInfo(vehicle: any) {
    this.service.getVehicle(vehicle).subscribe(
      response => this.toastrInfo(response)
    )
  }

  toastrInfo(data: any) {
    
       

    this.toastr.info(
      'Current Location: <b>' + data.currentLocation + '</b><br>' +
      'Length: <b>' + data.vehicle.length + '</b>\'<br>' +
      'Maintenance ID: <b>' + data.vehicle.maintId + '</b><br>' , 
      'Vehicle (' + data.vehicle.number + ')',
      {
        enableHtml: true,
        closeButton: true,
        disableTimeOut: true
      }
    )
  }

    

  changeDriverDialog(vehicleId: string): void {

    console.log('vehicleId: ' + vehicleId)

    

    const dialogRef = this.dialog.open(ModalComponent, {
      data: { driver: this.driverList, vehicle: vehicleId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateDriver(result);
    });
  }

  updateDriver(data: any) {
    if (!data) {
      console.log('no vehicleId')
      return
    }
    let payload = { _id: data.vehicleId, defaultDriverId: data.driverId, defaultDriver: data.driver }
    console.log(payload)
     this.service.updateVehicle(payload).subscribe(
       response => this.toastr.success(response.success)
     )

     let navigationExtras: NavigationExtras = {
      queryParams: {
         refreshToken: (new Date).getTime() //pass a dummy parameter (i.e. the time in milliseconds since 1970 or use the npm uuid library), forces reload of unique url
      },
    };

     setTimeout(() => {
       this.router.navigate(['/dashboard'], navigationExtras)
     }, 1000);

     setTimeout(() => {
      location.reload()
    }, 1000);

  }



  addNoteDialog(vehicleId: string, number: string): void {

    console.log('vehicleId: ' + vehicleId)
    console.log('number: ' + number)

    

    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: { vehicle: vehicleId, number: number }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveNote(result);
    });
  }


  saveNote(data: any) {
    if (!data) {
      console.log('no data to save note')
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

    console.log('from note')
    console.log(payload)

    this.service.addNote(payload).subscribe(
      response => this.toastr.success(response.success)
    )

  }
 

  updateStatus(vehicleId: string, status: string) {
    console.log('triggered ' + vehicleId + ' ' + status)
    let payload = {
      _id: vehicleId,
      status: status
    }
    this.service.updateVehicle(payload).subscribe(
      response => {
        if (response) {
          this.toastr.success(response.success)
          this.reload()
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
  
  consoleLog(data: any) {
    console.log(data)
  }

}
