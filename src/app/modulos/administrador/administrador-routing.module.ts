import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { FormulariosComponent } from './formularios/formularios.component';
import { DetalleformularioComponent } from './detalleformulario/detalleformulario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ProtocolosComponent } from './protocolos/protocolos.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { ReportesComponent } from './reportes/reportes.component';
import { LineatiempoComponent } from './lineatiempo/lineatiempo.component';
import { CoreporteComponent } from './coreporte/coreporte.component';
import { UsuariosporseccionComponent } from './usuariosporseccion/usuariosporseccion.component';
import { TendenciasComponent } from './tendencias/tendencias.component';
import { ReporteporusuarioComponent } from './reporteporusuario/reporteporusuario.component';
import { FrecuenciaComponent } from './frecuencia/frecuencia.component';
import { ReportedeformulariosComponent } from './reportedeformularios/reportedeformularios.component';
import { ReportesgeneralComponent } from './reportesgeneral/reportesgeneral.component';
import { ReporteponderadoComponent } from './reporteponderado/reporteponderado.component';
import { FamiliasComponent } from './familias/familias.component';
import { UsuariossupervisionComponent } from './usuariossupervision/usuariossupervision.component';
import { EventosComponent } from './eventos/eventos.component';
import { BoletinComponent } from './boletin/boletin.component';
import { UpCommingComponent } from './upcomming/upcomming.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { SuggestionComponent } from './suggestion/suggestion.component';


const routes: Routes = [
  {
  path: 'preguntas',
  component: PreguntasComponent
}, {
  path: 'formularios',
  component: FormulariosComponent
}, {
  path: 'usuarios',
  component: UsuariosComponent
}, {
  path: 'updatelink',
  component: ProtocolosComponent
}, {
  path: 'noticias',
  component: NoticiasComponent
}, {
  path: 'formularios/nuevo',
  component: DetalleformularioComponent
}, {
  path: 'formularios/editar/:id',
  component: DetalleformularioComponent
}, {
  path: 'programacion',
  component: ProgramacionComponent
},{
  path: 'reporteboletin',
  component: ReportesComponent
}, {
  path: 'familias',
  component: FamiliasComponent
},{
  path: 'indicador',
  component: LineatiempoComponent
},{
  path: 'coomovidad',
  component: CoreporteComponent
}
,{
  path: 'tendencias',
  component: TendenciasComponent
},{
  path: 'reporteporusuario',
  component: ReporteporusuarioComponent
},{
  path: 'frecuencia',
  component: FrecuenciaComponent
},{
  path: 'reportegeneral',
  component: ReportedeformulariosComponent
},

{
  path: 'usuariosxseccion',
  component: UsuariosporseccionComponent
}, 
{
  path: 'detallesusuario/:userid',
  component: UserdetailComponent
},{
  path: 'reportesgenerales',
  component: ReportesgeneralComponent
},{
  path: 'reporteglobal',
  component: ReporteponderadoComponent
},{
  path: 'entrada/usuarios',
  component: UsuariossupervisionComponent
},{
  path: 'eventos',
  component: EventosComponent
}

,{
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
},
{
  path: 'calendario',
  component: CalendarioComponent
},
{
  path: 'notificaciones',
  component: NotificacionesComponent
},{
  path: 'sugerencias',
  component: SuggestionComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
