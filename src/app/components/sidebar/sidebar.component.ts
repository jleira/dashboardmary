import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  //    { path: '/home/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  /*    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
      { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
      { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
      { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
      { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
      { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
      { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {

  }

  ngOnInit() {
    let userdata = JSON.parse(localStorage.getItem('currentUser'));
    while (ROUTES.length > 0) {
      ROUTES.pop();
    }
  if (userdata.perfil_aplicacion == 1) {
    

      ROUTES.push(
        { path: '/home/administrador/noticias', title: 'Noticias', icon: 'article', class: 'bold' },
        { path: '/home/administrador/protocolos', title: 'Protocolos', icon: 'article', class: 'bold' },
        { path: '/home/administrador/programacion', title: 'Programación', icon: 'event_note', class: 'bold' },
        { path: '/home/administrador/usuarios', title: 'Usuarios', icon: 'person', class: 'bold' },
        { path: '/home/administrador/familias', title: 'Familias', icon: 'person', class: 'bold' },
        { path: '/home/administrador/preguntas', title: 'Preguntas', icon: 'format_list_numbered', class: 'bold' },
        { path: '/home/administrador/formularios', title: 'Formularios', icon: 'wysiwyg', class: 'bold' },
        { path: '/home/administrador/notificaciones', title: 'Notificaciones', icon: 'notification_important', class: 'bold' },
        { path: '/home/administrador/reportes', title: 'Resumen Diario', icon: 'analytics', class: 'bold' },
        { path: '/home/administrador/indicador', title: 'Reporte diario de casos', icon: 'analytics', class: 'bold' },
        { path: '/home/administrador/coomovidad', title: 'Grafico de Respuestas', icon: 'analytics', class: 'bold' },
        { path: '/home/administrador/frecuencia', title: 'comorbilidad frecuencia', icon: 'analytics', class: 'bold' },
        { path: '/home/administrador/usuariosxseccion', title: 'Reporte de usuarios', icon: 'analytics', class: 'bold' },        
        { path: '/home/administrador/tendencias', title: 'Tendencia de contagio', icon: 'analytics', class: 'bold' },        
        { path: '/home/administrador/reporteporusuario', title: 'Reporte por usuario', icon: 'analytics', class: 'bold' },        
        { path: '/home/administrador/reportegeneral', title: 'Reporte General', icon: 'format_list_numbered', class: 'bold' },   
        { path: '/home/administrador/reportesgenerales', title: 'Reporte por fechas', icon: 'format_list_numbered', class: 'bold' },   
        { path: '/home/administrador/reporteglobal', title: 'Reporte Global', icon: 'format_list_numbered', class: 'bold' },
        { path: '/home/administrador/entrada/usuarios', title: 'Usuarios entrada', icon: 'format_list_numbered', class: 'bold' },   
   
        
      );
    }

    if (userdata.perfil_aplicacion == 2) {
    

      ROUTES.push(
        { path: '/home/enfermeria/programacion', title: 'Programación', icon: 'event_note', class: 'bold' },
        { path: '/home/enfermeria/preguntas', title: 'Preguntas', icon: 'format_list_numbered', class: 'bold' },
        { path: '/home/enfermeria/usuarios', title: 'Usuarios', icon: 'person', class: 'bold' },
        { path: '/home/enfermeria/familias', title: 'Familias', icon: 'person', class: 'bold' },
        { path: '/home/enfermeria/formularios', title: 'Formularios', icon: 'wysiwyg', class: 'bold' },
        { path: '/home/enfermeria/notificaciones', title: 'Notificaciones', icon: 'notification_important', class: 'bold' },
        { path: '/home/enfermeria/reportes', title: 'Resumen Diario', icon: 'analytics', class: 'bold' },
        { path: '/home/enfermeria/indicador', title: 'Reporte diario de casos', icon: 'analytics', class: 'bold' },
        { path: '/home/enfermeria/coomovidad', title: 'Grafico de Respuestas', icon: 'analytics', class: 'bold' },
        { path: '/home/enfermeria/frecuencia', title: 'comorbilidad frecuencia', icon: 'analytics', class: 'bold' },
        { path: '/home/enfermeria/usuariosxseccion', title: 'Reporte de usuarios', icon: 'analytics', class: 'bold' },        
        { path: '/home/enfermeria/tendencias', title: 'Tendencia de contagio', icon: 'analytics', class: 'bold' },        
        { path: '/home/enfermeria/reporteporusuario', title: 'Reporte por usuario', icon: 'analytics', class: 'bold' },        
        { path: '/home/enfermeria/reportegeneral', title: 'Reporte General', icon: 'format_list_numbered', class: 'bold' },
        { path: '/home/enfermeria/reportesgenerales2', title: 'Reporte por fechas', icon: 'format_list_numbered', class: 'bold' },     
        { path: '/home/enfermeria/reporteglobal2', title: 'Reporte Global', icon: 'format_list_numbered', class: 'bold' },  
        { path: '/home/enfermeria/entrada/usuarios', title: 'Usuarios entrada', icon: 'format_list_numbered', class: 'bold' },   
 
      );
    }
    if (userdata.perfil_aplicacion == 3) {
    

      ROUTES.push(
        { path: '/home/comunicaciones/noticias', title: 'Noticias', icon: 'article', class: 'bold' },
        { path: '/home/comunicaciones/protocolos', title: 'Protocolos', icon: 'article', class: 'bold' },
        { path: '/home/comunicaciones/entrada/usuarios', title: 'Usuarios entrada', icon: 'format_list_numbered', class: 'bold' },   
      );
    }
    if (userdata.perfil_aplicacion == 4) {
    

      ROUTES.push(
        { path: '/home/sistemas/usuarios', title: 'Usuarios', icon: 'person', class: 'bold' },
        { path: '/home/sistemas/familias', title: 'Familias', icon: 'person', class: 'bold' },
        { path: '/home/comunicaciones/entrada/usuarios', title: 'Usuarios entrada', icon: 'format_list_numbered', class: 'bold' },   

      );
    }
    if (userdata.perfil_aplicacion == 5) {
    

      ROUTES.push(
        { path: '/home/consultas/reportes', title: 'Resumen Diario', icon: 'analytics', class: 'bold' },
        { path: '/home/consultas/indicador', title: 'Reporte diario de casos', icon: 'analytics', class: 'bold' },
        { path: '/home/consultas/coomovidad', title: 'Grafico de Respuestas', icon: 'analytics', class: 'bold' },
        { path: '/home/consultas/frecuencia', title: 'comorbilidad frecuencia', icon: 'analytics', class: 'bold' },
        { path: '/home/consultas/usuariosxseccion', title: 'Reporte de usuarios', icon: 'analytics', class: 'bold' },        
        { path: '/home/consultas/tendencias', title: 'Tendencia de contagio', icon: 'analytics', class: 'bold' },        
        { path: '/home/consultas/reporteporusuario', title: 'Reporte por usuario', icon: 'analytics', class: 'bold' },        
        { path: '/home/consultas/reportegeneral', title: 'Reporte General', icon: 'format_list_numbered', class: 'bold' },
        { path: '/home/consultas/reportesgenerales', title: 'Reporte por fechas', icon: 'format_list_numbered', class: 'bold' },
        { path: '/home/consultas/reporteglobal', title: 'Reporte Global', icon: 'format_list_numbered', class: 'bold' },  
        { path: '/home/consultas/entrada/usuarios', title: 'Usuarios entrada', icon: 'format_list_numbered', class: 'bold' },   
 
      );
    }
    if (userdata.perfil_aplicacion == 6) {
      ROUTES.push(
        { path: '/home/entrada/usuarios', title: 'Usuarios', icon: 'format_list_numbered', class: 'bold' },   
      );
    }


    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
