import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreporteComponent } from '../administrador/coreporte/coreporte.component';
import { FrecuenciaComponent } from '../administrador/frecuencia/frecuencia.component';
import { LineatiempoComponent } from '../administrador/lineatiempo/lineatiempo.component';
import { ProtocolosComponent } from '../administrador/protocolos/protocolos.component';
import { ReportedeformulariosComponent } from '../administrador/reportedeformularios/reportedeformularios.component';
import { ReporteponderadoComponent } from '../administrador/reporteponderado/reporteponderado.component';
import { ReporteporusuarioComponent } from '../administrador/reporteporusuario/reporteporusuario.component';
import { ReportesComponent } from '../administrador/reportes/reportes.component';
import { ReportesgeneralComponent } from '../administrador/reportesgeneral/reportesgeneral.component';
import { TendenciasComponent } from '../administrador/tendencias/tendencias.component';
import { UserdetailComponent } from '../administrador/userdetail/userdetail.component';
import { UsuariosporseccionComponent } from '../administrador/usuariosporseccion/usuariosporseccion.component';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


const routes: Routes = [
{
  path: 'detallesusuario/:userid',
  component: UserdetailComponent
},
{
  path: 'reportesgenerales',
  component: ReportesgeneralComponent
}, {
  path: 'updatelink',
  component: ProtocolosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
 