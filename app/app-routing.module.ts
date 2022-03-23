import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { RouteComponent } from './add-data/route/route.component';
import { UserComponent } from './add-data/user/user.component';
import { VehicleComponent } from './add-data/vehicle/vehicle.component';
import { AppComponent } from './app.component';
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

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'manage', component: AddDataComponent, children: [
    { path: 'user', component: UserComponent },
    { path: 'user/:id', component: UserComponent },
    { path: 'route', component: RouteComponent },
    { path: 'route/:id', component: RouteComponent},
    { path: 'vehicle', component: VehicleComponent },
    { path: 'vehicle/:id', component: VehicleComponent }
  ]},
  { path: 'list/users', component: ListComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'view', component: ViewComponent, children: [
    { path: 'vehicle', component: ViewvehicleComponent },
    { path: 'vehicle/:id', component: ViewvehicleComponent },
    { path: 'route', component: ViewrouteComponent },
    { path: 'route/:id', component: ViewrouteComponent },
    { path: 'user', component: ViewuserComponent },
    { path: 'user/:id', component: ViewuserComponent },
  ]},
  { path: 'passdown/:date', component: PassdownComponent, children: [
    { path: ':date', component: PassdownComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      onSameUrlNavigation: "reload"
    })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
