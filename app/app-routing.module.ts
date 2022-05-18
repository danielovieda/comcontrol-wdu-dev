import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { RouteComponent } from './add-data/route/route.component';
import { UserComponent } from './add-data/user/user.component';
import { VehicleComponent } from './add-data/vehicle/vehicle.component';
import { AppComponent } from './app.component';
import { MentionsComponent } from './components/mentions/mentions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PassdownComponent } from './passdown/passdown.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './tasks/tasks.component';
import { ViewComponent } from './view/view.component';
import { ViewrouteComponent } from './view/viewroute/viewroute.component';
import { ViewuserComponent } from './view/viewuser/viewuser.component';
import { ViewvehicleComponent } from './view/viewvehicle/viewvehicle.component';

import { AuthGuard } from '@auth0/auth0-angular';
import { NoteWizardComponent } from './modal/note-wizard/note-wizard.component';
import { ReportComponent } from './report/report.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard], children: [
    { path: 'user/add', component: AdminPanelComponent, canActivate: [AuthGuard]}
  ]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard]},
  {
    path: 'manage', component: AddDataComponent, canActivate: [AuthGuard], children: [
      { path: 'user', component: UserComponent },
      { path: 'user/:id', component: UserComponent },
      { path: 'route', component: RouteComponent },
      { path: 'route/:id', component: RouteComponent },
      { path: 'vehicle', component: VehicleComponent },
      { path: 'vehicle/:id', component: VehicleComponent }
    ]
  },
  { path: 'list/users', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'view', component: ViewComponent, canActivate: [AuthGuard], children: [
      { path: 'vehicle', component: ViewvehicleComponent },
      { path: 'vehicle/:id', component: ViewvehicleComponent },
      { path: 'route', component: ViewrouteComponent },
      { path: 'route/:id', component: ViewrouteComponent },
      { path: 'user', component: ViewuserComponent },
      { path: 'user/:id', component: ViewuserComponent },
    ]
  },
  {
    path: 'passdown/:date', component: PassdownComponent, canActivate: [AuthGuard], children: [
      { path: ':date', component: PassdownComponent }
    ]
  },
  {
    path: 'test',
    component: MentionsComponent
  },
  {
    path: 'wizard',
    component: NoteWizardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      onSameUrlNavigation: "reload"
    })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
