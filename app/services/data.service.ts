import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  vehicleList: any
  vehicleMiniList: any
  driverList: any
  routeList :any
  

  constructor(private service: BackendService) { }

  getLists() {
    this.getVehicleList()
    this.getVehicleMiniList()
    this.getDriverList()
    this.getRouteList()
  }

  getVehicleList() {
    this.service.getVehicleList().subscribe(
      response => {
        if (response) {
          this.vehicleList = response
          return response
        } else {
          console.log('Error getting vehicle list.')
          return null
        }
      }
    )
  }

  getVehicleMiniList() {
    this.service.getVehicleMiniList().subscribe(
      response => {
        if (response) {
          this.vehicleMiniList = response
        } else {
          console.log('Error getting vehicle list.')
        }
      }
    )
  }

  getDriverList() {
    this.service.getDriverList('mini').subscribe(
      response => {
        if (response) {
          this.driverList = response
          
        } else {
          console.log('Error getting driver list.')
        }
      }
    )
  }

  getRouteList() {
    this.service.getRouteList().subscribe(
      response => {
        if (response) {
          this.routeList = response
          
        } else {
          console.log('Error getting route list.')
        }
      }
    )
  }

  returnVehicles() {
    return this.vehicleList
  }

  returnMiniVehicles() {
    return this.vehicleMiniList
  }

  returnDrivers() {
    return this.driverList
  }

  returnRoutes() {
    return this.routeList
  }





}
