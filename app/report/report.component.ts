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

  constructor(private backend: BackendService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.backend.getVehicleFullList().subscribe(
      response => {
        if (response) {
          this.vehicleList = response
          console.log(this.vehicleList)
        } else {
          //error
        }
      }
    )
  }


  showVehicleDialog(vehicleId: string): void {
    console.log('which vehicle ', vehicleId)
    const dialogRef = this.dialog.open(ViewmodalComponent, {
      data: { vehicle: vehicleId}
    });
  }

}
