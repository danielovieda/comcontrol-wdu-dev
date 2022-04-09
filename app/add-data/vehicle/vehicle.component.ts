import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { vehicle } from '../../interfaces/vehicle';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  editVehicle: any
  editMode: boolean = false
  deleteMode: boolean = false
  notFound: boolean = false


  additionalId: FormArray
  addVehicle: FormGroup

  routes: any = [{}]
  defaultRouteText: string = ''


  constructor(private route: ActivatedRoute, private service: BackendService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
    ) {

    this.addVehicle = new FormGroup({
      _id: new FormControl(),
      identifier: new FormControl(),
      status: new FormControl('active', Validators.required),
      currentLocation: new FormControl('B56', Validators.required),
      
      defaultDriver: new FormControl(),
      defaultRoute: new FormControl(),
      defaultYard: new FormControl(),
      defaultDriverId: new FormControl(),
      defaultRouteId: new FormControl(),
      defaultYardId: new FormControl(),
  
      vehicle: new FormGroup({
        
        year: new FormControl(),
        make: new FormControl(),
        model: new FormControl(),
        seatCount: new FormControl(),
        length: new FormControl(),
        number: new FormControl('', Validators.required),
        maintId: new FormControl(),
        vin: new FormControl(),
        license: new FormControl(),
        
        additionalId: new FormArray([
          new FormGroup({
            label: new FormControl(''),
            number: new FormControl('')
          })
        ])
      })
    })

    this.additionalId = this.addVehicle.get('vehicle').get('additionalId') as FormArray
  }

  ngOnInit(): void {

    this.service.getRouteMiniList().subscribe(
      response => this.routes = response
    )

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.editVehicle = params.get('id')
    })
    if (this.editVehicle != null) {
      this.editMode = true
      this.spinner.show();
      this.service.getVehicle(this.editVehicle).subscribe(
        response => this.loadVehicleToForm(response)
    )
    this.addVehicle.get('vehicle').get('number').disable()

    }

  }

  submit() {
    if (!this.addVehicle.valid) {
      this.toastr.error('Ensure form is valid before submission.')
      return
    }
    this.addVehicle.get('vehicle').get('number').enable()

    if (this.defaultRouteText) {
      this.addVehicle.get('defaultRoute').setValue(this.defaultRouteText)
    }

    console.log(this.addVehicle)

    console.log(this.addVehicle.value)
    //this.service.addVehicle(this.addVehicle.value)
    if (this.addVehicle.get('_id').value == null) {
      this.addVehicle.get('_id').setValue('')
    }

    let trimmed = this.addVehicle.get('identifier').value

    this.addVehicle.get('identifier').setValue(trimmed.trim())

    // if (this.addVehicle.get('defaultRouteId').value != null) {
    //   this.addVehicle.get('defaultRoute').setValue(this.addVehicle.get('defaultRouteId').)
    // }

    this.saveVehicle(this.addVehicle.value)
    if (this.editMode) {
      this.addVehicle.get('vehicle').get('number').disable()
    }
  }

  saveVehicle(data: any) {
    this.service.updateVehicle(data).subscribe(
      response => this.saveResponse(response.success)
    )

    if (!this.editMode) {
      this.addVehicle.reset()
   }
  }

  saveResponse(message: any) {
    if (message.includes('DELETED')) {
      this.toastr.success('Vehicle was deleted successfully.')
      setTimeout(() => {
        this.router.navigateByUrl('/dashboard')
      }, 2000)
    } else {
      this.toastr.success(message)
    }
  }

  

  addMoreIds() {

    let control = new FormGroup({
      label: new FormControl(''),
      number: new FormControl('')
    })

    this.additionalId.push(control);
  }

  loadVehicleToForm(data: vehicle) {

    if (data == null) {
      this.spinner.hide();
      this.toastr.error("Vehicle not found.")
      return
    }

    //console.log(data.vehicle.additionalId.length)

    if (data.vehicle.additionalId.length > 1) {
      for(let i = 1; i < data.vehicle.additionalId.length; i++) {
        this.addMoreIds()
      }
    }
    
    this.addVehicle.reset()
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);

    
    
    this.addVehicle.setValue({
      _id: data._id,
      identifier: data.identifier,
      status: data.status,
      currentLocation: data.currentLocation,
      vehicle: data.vehicle,
      defaultDriver: data.defaultDriver,
      defaultDriverId: data.defaultDriverId,
      defaultRoute: data.defaultRoute,
      defaultRouteId: data.defaultRouteId,
      defaultYard: data.defaultYard,
      defaultYardId: data.defaultYardId,
      })

      this.toastr.success("Editing Vehicle #" + this.addVehicle.get('vehicle').get('number').value)

      

  }

 delete() {
   let del = new FormControl('user_id')
   this.addVehicle.addControl('delete', del)
   this.deleteMode = true
   this.toastr.warning('Click update to confirm deletion.')
 }

 selectedValue(event: any) {
  console.log(event)

  this.defaultRouteText = event.target.options[event.target.options.selectedIndex].text;
  console.log(this.defaultRouteText)
}




}
