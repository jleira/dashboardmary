import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariossupervisionComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorentradaRoutingModule { }
