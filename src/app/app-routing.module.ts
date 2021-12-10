import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { InputComponent } from './input/input.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'input',
    pathMatch: 'full'
  },
  {
    path: 'input',
    component: InputComponent,
  },{
    path: 'view',
    component: ViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
