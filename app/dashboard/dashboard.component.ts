import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service'
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() mini: boolean = false

  driverList: any = [{}]

  timer: any

  constructor(private service: BackendService, private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.timer = setInterval(() => {
      this.refresh()

    }, 2500)
    this.vehicleList.pop()
    
    this.dataService.getLists()
    this.addVehicle(this.dataService.returnVehicles())

    this.driverList = this.dataService.returnDrivers()


  }

  refresh() {
    
    this.dataService.getVehicleList()
    this.vehicleList = [{}]
    this.vehicleList.pop()
    this.addVehicle(this.dataService.returnVehicles())
    this.driverList = this.dataService.returnDrivers()
    this.timer = clearInterval(this.timer)
    this.toastr.info('Vehicle data has been refreshed!')
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


  getStatusCount(status: string): number {
    const vehicles = [...this.vehicleList]
    return vehicles.filter((vehicle: any) => vehicle.status === status).length
  }

}
