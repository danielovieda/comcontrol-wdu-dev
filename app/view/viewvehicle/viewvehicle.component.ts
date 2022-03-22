import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material/dialog";
import { AddNoteComponent } from 'src/app/modal/add-note/add-note.component';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-viewvehicle',
  templateUrl: './viewvehicle.component.html',
  styleUrls: ['./viewvehicle.component.scss']
})
export class ViewvehicleComponent implements OnInit {

  vehicleId: any
  vehicleData: any
  noteData:any
  timestamp: any
  

  constructor(private service: BackendService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private userService: UserService) { }

  ngOnInit(): void {
    
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.vehicleId = params.get('id')
        this.loadData(this.vehicleId)
      })

      
     
    
  }

  loadData(id: string) {
    this.service.getVehicle(id).subscribe(
      response => {
        if (response) {
          this.vehicleData = response
          console.log(this.vehicleData)
        } else {
          this.toastr.error('Error.')
        }
        
      }
    )

    this.service.getNotes(id).subscribe(
      response => {
        if (response) {
          this.noteData = response
          console.log(this.noteData)
        } else {
          this.toastr.error('Error.')
        }
        
      }
    )

    
    
    
  }

  doSomething() {
    console.log(this.vehicleData)
    console.log(this.noteData)
  }

  closeNote(id: string) {
    this.timestamp = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');

    let payload = {
      _id: id,
      status: 'closed',
      closedTimestamp: this.timestamp,
      closedBy: this.userService.getUser()
    }
    this.service.updateNote(payload).subscribe(
      response => this.toastr.success(response.success)
    )

    this.refreshNotes()
  }

  refreshNotes() {
    setTimeout(() => {}, 1000);
    this.noteData = {}
    setTimeout(() => {}, 1000);

    this.service.getNotes(this.vehicleId).subscribe(
      response => this.noteData = response
    )
  }

  checkNull(string: string): boolean {
    if (typeof string != 'undefined' && string) {
      return true;
    }
    return false;
  }

  addNoteDialog(vehicleId: string): void {

    console.log('vehicleId: ' + vehicleId)

    

    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: { vehicle: vehicleId }
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
      number: this.vehicleData.vehicle.number,
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

    this.refreshNotes()

  }

  filterNotes(type: string) {
    this.noteData = this.noteData.filter((noteType: string) => noteType == 'maintenance')
  }

}
