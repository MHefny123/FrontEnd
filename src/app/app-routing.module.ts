import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'List of users' }
  },
  {
    path: 'user-details/:id',
    component: UsersDetailComponent,
    data: { title: 'user Details' }
  },
  {
    path: 'user-add',
    component: UsersAddComponent,
    data: { title: 'Add user' }
  },
  {
    path: 'user-edit/:id',
    component: UsersEditComponent,
    data: { title: 'Edit user' }
  },
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
