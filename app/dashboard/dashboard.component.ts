import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
    for(let i = 0; i < data.length; i++) {
      this.vehicleList.push({
        _id: data[i]._id,
        vehicle: data[i].vehicle.number,
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
        console.log('vehicle list')
        console.log(response)
        this.addVehicle(response)

      }
    )
  }

  loadDriverList() {
    console.log('loaded')
    this.service.getDriverList("mini").subscribe(
      response => this.driverList = response
    )
  }

}
