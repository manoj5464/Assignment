import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ChartComponent } from './chart/chart.component';


const routes: Routes = [
  {
    path:'',
    component:UserListComponent,
    pathMatch:'full'
  },
  {
    path:'userlist',
    component:UserListComponent,
    pathMatch:'full'
  }, 
  {
     path:'user/:id',
     component:UserInfoComponent,
     pathMatch:'full'
  },
  {
    path:'horizontal-chart',
    component:ChartComponent
  },
  {
    path:'**',
    redirectTo:'userlist',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
