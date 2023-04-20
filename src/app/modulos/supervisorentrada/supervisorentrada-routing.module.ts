import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtocolosComponent } from '../administrador/protocolos/protocolos.component';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariossupervisionComponent
  }, {
    path: 'updatelink',
    component: ProtocolosComponent
  },{
    path: 'updatelink',
    component: ProtocolosComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorentradaRoutingModule { }
