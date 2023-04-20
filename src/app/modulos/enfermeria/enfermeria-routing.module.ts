import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreporteComponent } from '../administrador/coreporte/coreporte.component';
import { DetalleformularioComponent } from '../administrador/detalleformulario/detalleformulario.component';
import { FamiliasComponent } from '../administrador/familias/familias.component';
import { FormulariosComponent } from '../administrador/formularios/formularios.component';
import { FrecuenciaComponent } from '../administrador/frecuencia/frecuencia.component';
import { LineatiempoComponent } from '../administrador/lineatiempo/lineatiempo.component';
import { NotificacionesComponent } from '../administrador/notificaciones/notificaciones.component';
import { PreguntasComponent } from '../administrador/preguntas/preguntas.component';
import { ProgramacionComponent } from '../administrador/programacion/programacion.component';
import { ProtocolosComponent } from '../administrador/protocolos/protocolos.component';
import { ReportedeformulariosComponent } from '../administrador/reportedeformularios/reportedeformularios.component';
import { ReporteponderadoComponent } from '../administrador/reporteponderado/reporteponderado.component';
import { ReporteporusuarioComponent } from '../administrador/reporteporusuario/reporteporusuario.component';
import { ReportesComponent } from '../administrador/reportes/reportes.component';
import { ReportesgeneralComponent } from '../administrador/reportesgeneral/reportesgeneral.component';
import { TendenciasComponent } from '../administrador/tendencias/tendencias.component';
import { UserdetailComponent } from '../administrador/userdetail/userdetail.component';
import { UsuariosComponent } from '../administrador/usuarios/usuarios.component';
import { UsuariosporseccionComponent } from '../administrador/usuariosporseccion/usuariosporseccion.component';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


const routes: Routes = [
  
{
  path: 'usuarios',
  component: UsuariosComponent
},
{
  path: 'familias',
  component: FamiliasComponent
}, {
  path: 'updatelink',
  component: ProtocolosComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnfermeriaRoutingModule { }
