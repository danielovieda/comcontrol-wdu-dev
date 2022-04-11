import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() mini: boolean = false

  driverList: any = [{}]

  constructor(private service: BackendService) { }

  ngOnInit(): void {
    this.vehicleList.pop()
    
    this.getVehicles()

    this.loadDriverList()
  }

  vehicleList = [{}]
  shownVehicleList = [{}]
  filterToggle: boolean = true
  currentFilter: string

  addVehicle(data: any) {
    //console.log(data)
    for(let i = 0; i < data.length; i++) {
      this.vehicleList.push({
        _id: data[i]._id,
        vehicle: data[i].vehicle.number,
        currentLocation: data[i].currentLocation,
        defaultYard: data[i].defaultYard,
        name: data[i].defaultDriver,
        route: data[i].defaultRoute,
        status: data[i].status,
        identifier: data[i].identifier,
        driverId: data[i].defaultDriverId
      })
    }

    

    this.shownVehicleList = this.vehicleList
    
  }

  filter(filtStatus: any) {

    if (this.currentFilter === filtStatus) {
      this.filterToggle = !this.filterToggle
    }
    

    if (this.filterToggle) {
      this.shownVehicleList = this.vehicleList.filter(status => this.filterStatus(status, filtStatus))
      this.currentFilter = filtStatus
    } else {
      this.shownVehicleList = this.vehicleList
      this.currentFilter = ''
      this.filterToggle = true
    }
    
    
  }

  filterStatus(element: any, status: string) {

    if (element.status === status) { 
      return true
    } else {
      return false
    }
  }

  getVehicles() {
    this.service.getVehicleList().subscribe(
      response => {
        this.addVehicle(response)

      }
    )
  }

  loadDriverList() {
   
    this.service.getDriverList("mini").subscribe(
      response => this.driverList = response
    )
  }

  getStatusCount(status: string): number {
    const vehicles = [...this.vehicleList]
    return Number(vehicles.filter((vehicle: any) => vehicle.status === status).length)
  }

}
