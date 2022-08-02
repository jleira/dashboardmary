import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamiliasComponent } from '../administrador/familias/familias.component';
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
  },{
    path: 'entrada/usuarios',
    component: UsuariossupervisionComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemasRoutingModule { }
