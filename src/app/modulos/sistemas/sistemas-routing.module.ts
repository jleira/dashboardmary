import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoletinComponent } from '../administrador/boletin/boletin.component';
import { FamiliasComponent } from '../administrador/familias/familias.component';
import { NoticiasComponent } from '../administrador/noticias/noticias.component';
import { ProtocolosComponent } from '../administrador/protocolos/protocolos.component';
import { UpCommingComponent } from '../administrador/upcomming/upcomming.component';
import { UserdetailComponent } from '../administrador/userdetail/userdetail.component';
import { UsuariosComponent } from '../administrador/usuarios/usuarios.component';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'familias',
    component: FamiliasComponent
  },
  {
    path: 'detallesusuario/:userid',
    component: UserdetailComponent
  }, {
    path: 'entrada/usuarios',
    component: UsuariossupervisionComponent
  }, {
    path: 'updatelink',
    component: ProtocolosComponent
  },
  {
    path: 'boletin',
    component: BoletinComponent
  }, {
    path: 'noticias',
    component: NoticiasComponent
  }, {
    path: 'upcomming',
    component: UpCommingComponent
  },{
    path: 'entrada/usuarios',
    component: UsuariossupervisionComponent
  },
  {
    path: 'updatelink',
    component: ProtocolosComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemasRoutingModule { }
