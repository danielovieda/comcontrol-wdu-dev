import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private getVehicleUrl = environment.BASE_API_URL + '/get/vehicle/'
  private updateVehicleUrl = environment.BASE_API_URL + '/update/vehicle/'
  private getVehicleListUrl = environment.BASE_API_URL + '/list/vehicles'
  private getVehicleMiniListUrl = environment.BASE_API_URL + '/minilist/vehicles'
  private getVehicleListFullUrl = environment.BASE_API_URL + '/list/vehicles_full'
  //routes
  private updateRouteUrl = environment.BASE_API_URL + '/update/route'
  private getRouteUrl = environment.BASE_API_URL + '/get/route/'
  private getRouteListUrl = environment.BASE_API_URL + '/list/routes'
  private getRouteMiniListUrl = environment.BASE_API_URL + '/minilist/routes'
  //users
  private getUserListUrl = environment.BASE_API_URL + '/get/users'
  private updateUsersUrl = environment.BASE_API_URL + '/update/user'
  private getDriverListUrl = environment.BASE_API_URL + '/list/drivers/'
  private getUserUrl = environment.BASE_API_URL + '/get/user/'

  //notes

  private addNoteUrl = environment.BASE_API_URL + '/add/note'
  private getNotesUrl = environment.BASE_API_URL + '/list/notes/'
  private updateNoteUrl = environment.BASE_API_URL + '/update/note'

  //passdown

  private getPassdownUrl = environment.BASE_API_URL + '/get/passdown/site'
  private getScheduleUrl = environment.BASE_API_URL + '/get/schedule/'

  private addOffUrl = environment.BASE_API_URL + '/add/off_time/'
  private addProtectionUrl = environment.BASE_API_URL + '/add/protection/'
  private addPmUrl = environment.BASE_API_URL + '/add/pm/'
  private addPassdownNoteUrl = environment.BASE_API_URL + '/add/note/'
  private addPinnedNoteUrl = environment.BASE_API_URL + '/add/pinned_note'

  private removePassdownNoteUrl = environment.BASE_API_URL + '/remove/note/'
  private removeCalloutUrl = environment.BASE_API_URL + '/remove/off_time/'
  private removeProtectionUrl = environment.BASE_API_URL + '/remove/protection/'
  private removePmUrl = environment.BASE_API_URL + '/remove/pm/'
  private confirmProtectionUrl = environment.BASE_API_URL + '/confirm/protection'

  private getPinnedUrl = environment.BASE_API_URL + '/get/pinned'
  private deletePinnedUrl = environment.BASE_API_URL + '/delete/pinned_note'
  private updatePinnedUrl = environment.BASE_API_URL + '/update/pinned'

  private getSettingsUrl = environment.BASE_API_URL + '/get/settings/'

  private searchNoteUrl = environment.BASE_API_URL + '/search/note/'

  private editNoteUrl = environment.BASE_API_URL + '/edit/passdown_note/'

  private addPassdownCommentUrl = environment.BASE_API_URL + '/add/comment/'

  private deletePassdownCommentUrl = environment.BASE_API_URL + '/remove/comment/'

  private addMaintCommentUrl = environment.BASE_API_URL + '/add/maintComment/'

  private remoteMaintCommentUrl = environment.BASE_API_URL + '/remove/maintComment/'

  private deleteMaintNoteUrl = environment.BASE_API_URL + '/delete/maintNote/'

  private addHistoryUrl = environment.BASE_API_URL + '/add/history/'

  private addPinnedCommentUrl = environment.BASE_API_URL + '/add/pinnedComment/'

  private removePinnedCommentUrl = environment.BASE_API_URL + '/remove/pinnedComment/'

  private addVehicleHistoryUrl = environment.BASE_API_URL + '/add/vehicle_history/'

  constructor(private http: HttpClient,
    private datepipe: DatePipe,
    private userService: UserService) { }

  getVehicle(id: string): Observable<any> {
    return this.http.get(this.getVehicleUrl + id)
  }

  updateVehicle(data: any): Observable<any> {
    return this.http.post<any>(this.updateVehicleUrl, data)
  }

  getVehicleList(): Observable<any> {
    return this.http.get(this.getVehicleListUrl)
  }

  getVehicleFullList(): Observable<any> {
    return this.http.get(this.getVehicleListFullUrl)
  }

  getVehicleMiniList(): Observable<any> {
    return this.http.get(this.getVehicleMiniListUrl)
  }

  //routes

  updateRoute(data: any): Observable<any> {
    return this.http.post<any>(this.updateRouteUrl, data)
  }

  getRoute(id: string): Observable<any> {
    return this.http.get(this.getRouteUrl + id)
  }

  getRouteList(): Observable<any> {
    return this.http.get(this.getRouteListUrl)
  }

  getRouteMiniList(): Observable<any> {
    return this.http.get(this.getRouteMiniListUrl)
  }

  //users

  updateUser(data: any): Observable<any> {
    return this.http.post<any>(this.updateUsersUrl, data)
  }

  getUserList(): Observable<any> {
    return this.http.get(this.getUserListUrl)
  }

  getSettings(authId: string): Observable<any> {
    return this.http.get(this.getSettingsUrl + authId)
  }

  getUserData(id: string): Observable<any> {
    return this.http.get(this.getUserUrl + id)
  }

  getDriverList(option: string): Observable<any> {
    return this.http.get(this.getDriverListUrl + option)
  }

  addNote(data: any): Observable<any> {
    return this.http.post<any>(this.addNoteUrl, data)
  }

  getNotes(vehicleId: string): Observable<any> {
    return this.http.get(this.getNotesUrl + vehicleId)
  }

  getPinned(): Observable<any> {
    return this.http.get(this.getPinnedUrl)
  }

  updateNote(data: any): Observable<any> {
    return this.http.post<any>(this.updateNoteUrl, data)
  }

  //passdown
  getPassdown(site: string): Observable<any> {
    return this.http.get(this.getPassdownUrl)
  }

  getSchedule(date: string): Observable<any> {
    return this.http.get(this.getScheduleUrl + date)
  }

  addOfftime(date: string, data: any): Observable<any> {
    return this.http.post<any>(this.addOffUrl + date, data)
  }

  addProtection(date: string, data: any): Observable<any> {
    return this.http.post<any>(this.addProtectionUrl + date, data)
  }

  addPm(date: string, data: any): Observable<any> {
    return this.http.post<any>(this.addPmUrl + date, data)
  }

  addPassdownNote(date: string, data: any): Observable<any> {
    return this.http.post<any>(this.addPassdownNoteUrl + date, data)
  }

  addPinnedNote(data: any): Observable<any> {
    return this.http.post<any>(this.addPinnedNoteUrl, data)
  }

  removePassdownNote(date: string, id: string, data: {}): Observable<any> {
    return this.http.post<any>(this.removePassdownNoteUrl + date + '/' + id, data)
  }

  removeCallout(date: string, id: string, data: {}): Observable<any> {
    return this.http.post<any>(this.removeCalloutUrl + date + '/' + id, data)
  }

  removeProtection(date: string, id: string, data: {}): Observable<any> {
    return this.http.post<any>(this.removeProtectionUrl + date + '/' + id, data)
  }

  removePm(date: string, id: string, data: {}): Observable<any> {
    return this.http.post<any>(this.removePmUrl + date + '/' + id, data)
  }

  confirmProtection(data: any): Observable<any> {
    return this.http.post<any>(this.confirmProtectionUrl, data)
  }

  deletePinned(data: any): Observable<any> {
    return this.http.post<any>(this.deletePinnedUrl, data)
  }

  closedPinned(data: any): Observable<any> {
    return this.http.post<any>(this.updatePinnedUrl, data)
  }
  
  searchForNote(needle: string): Observable<any> {
    return this.http.get(this.searchNoteUrl + needle)
  }

  editNote(id: string, data: any): Observable<any> {
    return this.http.post<any>(this.editNoteUrl + id, data)
  }

  addPassdownComment(id: string, data: any): Observable<any> {
    return this.http.post<any>(this.addPassdownCommentUrl + id, data)
  }

  removePassdownComment(id: string, data: {}): Observable<any> {
    return this.http.post<any>(this.deletePassdownCommentUrl + id, data)
  }

  addMaintComment(id: string, data: any): Observable<any> {
    return this.http.post<any>(this.addMaintCommentUrl + id, data)
  }

  removeMaintComment(id: string, data: {}): Observable<any> {
    return this.http.post<any>(this.remoteMaintCommentUrl + id, data)
  }

  deleteMaintNote(id: string): Observable<any> {
    return this.http.delete<any>(this.deleteMaintNoteUrl + id)
  }

  addHistory(action: string, item: string, itemId: string, on: string, onId: string, content: string): Observable<any> {
    let date = this.getToday()
    let data = {
      timestamp: this.getTimestamp(),
      username: this.userService.getUser(),
      message: action + ' ' + item + '(' + itemId + ') to ' + on + ' (' + onId + '): ' + content
    }
    return this.http.post<any>(this.addHistoryUrl + date, data)
  }

  addVehicleHistory(vehicleId: string, message: any): Observable<any> {
    console.log(message)
    let data = {
      timestamp: this.getTimestamp(),
      username: this.userService.getUser(),
      message: message
    }
    console.log(data)
    return this.http.post<any>(this.addVehicleHistoryUrl + vehicleId, data)
  }

  getTimestamp(): string {
    return this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss a');
  }

  getToday(): string {
    return this.datepipe.transform((new Date), 'MM-dd-yyyy')
  }

  addPinnedComment(id: string, data: any): Observable<any> {
    return this.http.post<any>(this.addPinnedCommentUrl + id, data)
  }

  removePinnedComment(id: string, data: {}): Observable<any> {
    return this.http.post<any>(this.removePinnedCommentUrl + id, data)
  }


}