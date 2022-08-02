import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticiasComponent } from '../administrador/noticias/noticias.component';
import { ProtocolosComponent } from '../administrador/protocolos/protocolos.component';
import { UsuariosporseccionComponent } from '../administrador/usuariosporseccion/usuariosporseccion.component';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


const routes: Routes = [  {
  path: 'protocolos',
  component: ProtocolosComponent
}, {
  path: 'noticias',
  component: NoticiasComponent
},{
  path: 'entrada/usuarios',
  component: UsuariossupervisionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunicacionesRoutingModule { }
