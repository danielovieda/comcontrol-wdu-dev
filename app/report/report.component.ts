import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { MatDialog } from "@angular/material/dialog";
import { ViewmodalComponent } from 'src/app/view/viewmodal/viewmodal.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  vehicleList: any
  isLoaded: boolean = false
  hasRecords: boolean = true

  constructor(private backend: BackendService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadVehicles('Genentech')
  }


  showVehicleDialog(vehicleId: string): void {
    console.log('which vehicle ', vehicleId)
    const dialogRef = this.dialog.open(ViewmodalComponent, {
      data: { vehicle: vehicleId}
    });
  }

  changeFilter(event: any) {
    this.loadVehicles(event.target.value)
  }

  loadVehicles(account: string) {
    this.isLoaded = false

    if (account === 'Genentech') {

      this.backend.getVehicleFullList().subscribe(
        response => {
          if (response) {
            this.vehicleList = response
            this.isLoaded = true
            this.hasRecords = true
          } else {
            this.hasRecords = false
          }
        }
      )
    } else {
      this.isLoaded = true
      this.hasRecords = false
    }
    
  }

}
