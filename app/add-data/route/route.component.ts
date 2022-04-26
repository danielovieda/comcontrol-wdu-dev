import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  editMode: boolean = false
  editRouteId: string
  vehicles: any = [{}]
  drivers: any = [{}]
  genericError: string = "An unknown error occurred. Please try again."

  constructor(private toastr: ToastrService,
    private service: BackendService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private dataService: DataService) { }

  async ngOnInit(): Promise<void> {
    this.vehicles = this.dataService.returnVehicles()

    this.drivers = this.dataService.returnDrivers()

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.editRouteId = params.get('id')
      console.log(this.editRouteId + ' route id')
    })

    if (this.editRouteId != null) {
      this.service.getRoute(this.editRouteId).subscribe(
        response => {
          if (response._id) {
            this.editMode = true
            this.spinner.show()
            this.loadRoute(response)
          } else {
            this.toastr.error(this.genericError)
          }
        }
      )

    }

  }

  routeForm = new FormGroup({
    _id: new FormControl(''),
    routeName: new FormControl(''),
    routeShortname: new FormControl('', Validators.required),
    assignedDriver: new FormControl('')
  })

  submit() {
    if (!this.routeForm.valid) {
      this.toastr.error('Ensure form is valid before submission.')
      return
    }
    if (this.routeForm.get('_id').value == null) {
      this.routeForm.get('_id').setValue('')
    }
    console.log(JSON.stringify(this.vehicles))
    console.log(this.routeForm.value)
    this.service.updateRoute(this.routeForm.value).subscribe(
       response => this.saveRoute(response)
     )
  }

  saveRoute(data: any) {
    if (data.success) {
      this.toastr.success(data.success)
      if (!this.editMode) {
        this.routeForm.reset()
      }
      
    } else {
      this.toastr.error(JSON.stringify(data))
    }
  }


  loadRoute(data: any) {
    if (data == null) {
      this.spinner.hide();
      this.toastr.error(this.genericError)
      return
    }

    this.routeForm.reset()
    
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);

    this.routeForm.setValue({
      _id: data._id,
      routeName: data.routeName,
      routeShortname: data.routeShortname,
      assignedDriver: data.assignedDriver
    })
    
  }

}
