import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDataComponent } from './add-data/add-data.component';
import { UserComponent } from './add-data/user/user.component';
import { VehicleComponent } from './add-data/vehicle/vehicle.component';
import { RouteComponent } from './add-data/route/route.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterBarComponent } from './dashboard/filter-bar/filter-bar.component';
import { VehicleCardComponent } from './dashboard/vehicle-card/vehicle-card.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuOptionsComponent } from './nav/menu-options/menu-options.component';
import { SettingsComponent } from './settings/settings.component';
import { LogoutComponent } from './logout/logout.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskCardComponent } from './tasks/task-card/task-card.component';
import { HttpClientModule } from '@angular/common/http'
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalComponent } from './modal/modal.component'; 
import { MatSelectModule } from '@angular/material/select';
import { ViewComponent } from './view/view.component';
import { ViewvehicleComponent } from './view/viewvehicle/viewvehicle.component';
import { AddNoteComponent } from './modal/add-note/add-note.component';
import { DatePipe } from '@angular/common';
import { ViewnotesComponent } from './view/viewnotes/viewnotes.component';

import { AuthModule } from '@auth0/auth0-angular';
import { PassdownComponent } from './passdown/passdown.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleComponent } from './passdown/schedule/schedule.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { ViewrouteComponent } from './view/viewroute/viewroute.component';
import { ViewuserComponent } from './view/viewuser/viewuser.component';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ProfileComponent } from './profile/profile.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';
import { DragDropModule} from '@angular/cdk/drag-drop';






@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    AddDataComponent,
    UserComponent,
    VehicleComponent,
    RouteComponent,
    DashboardComponent,
    FilterBarComponent,
    VehicleCardComponent,
    MenuOptionsComponent,
    SettingsComponent,
    LogoutComponent,
    TasksComponent,
    TaskCardComponent,
    ModalComponent,
    ViewComponent,
    ViewvehicleComponent,
    AddNoteComponent,
    ViewnotesComponent,
    PassdownComponent,
    CalendarComponent,
    ScheduleComponent,
    ViewrouteComponent,
    ViewuserComponent,
    TimeAgoPipe,
    ProfileComponent,
    ListComponent,
    SearchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    AuthModule.forRoot({
      domain: 'dev-8zp3w3q5.us.auth0.com',
      clientId: 'MBOPJCg4Up60gxCoAd5IhTKwOkfBov9t',
      cacheLocation: 'localstorage'
    }),
    MatAutocompleteModule,
    MatTooltipModule,
    MatMenuModule,
    MatCheckboxModule,
    DragDropModule
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
