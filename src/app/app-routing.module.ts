import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './core/components/create/create.component';
import { ListComponent } from './core/components/list/list.component';

// Possible optimization: Handle routes through components routing
const routes: Routes = [
  {
    path: 'list',
    pathMatch: 'full',
    component: ListComponent
  },
  {
    path: 'new-entry',
    pathMatch: 'full',
    component: CreateComponent
  },
  {
    path: '**',
    redirectTo: '/list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
