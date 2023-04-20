import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoletinComponent } from '../administrador/boletin/boletin.component';
import { NoticiasComponent } from '../administrador/noticias/noticias.component';
import { ProtocolosComponent } from '../administrador/protocolos/protocolos.component';
import { ReportesComponent } from '../administrador/reportes/reportes.component';
import { UpCommingComponent } from '../administrador/upcomming/upcomming.component';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


const routes: Routes = [  {
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
},{
  path: 'reporteboletin',
  component: ReportesComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunicacionesRoutingModule { }
