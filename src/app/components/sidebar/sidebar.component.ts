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
  if (userdata.perfil == 1) {
    

      ROUTES.push(
        { path: '/home/administrador/usuarios', title: 'Usuarios', icon: 'person', class: 'bold' },
        { path: '/home/administrador/familias', title: 'Familias', icon: 'person', class: 'bold' },           
        { path: '/home/administrador/noticias', title: 'Noticias', icon: 'article', class: 'bold' },
        { path: '/home/administrador/boletin', title: 'El Boletin', icon: 'article', class: 'bold' },
        { path: '/home/administrador/upcomming', title: 'upcomming events', icon: 'article', class: 'bold' },
        { path: '/home/administrador/reporteboletin', title: 'reporte boletin', icon: 'article', class: 'bold' },
        { path: '/home/administrador/calendario', title: 'Calendario', icon: 'article', class: 'bold' },
        { path: '/home/administrador/notificaciones', title: 'Notificaciones', icon: 'article', class: 'bold' },
        { path: '/home/administrador/sugerencias', title: 'Sugerencias', icon: 'article', class: 'bold' },
      );
      if (userdata.calendar){
        ROUTES.push({ path: '/home/administrador/updatelink', title: 'link de citas', icon: 'link', class: 'bold' })
      }
    }

    else if (userdata.perfil == 2) {
    

      ROUTES.push(
        { path: '/home/enfermeria/usuarios', title: 'Usuarios', icon: 'person', class: 'bold' },
        { path: '/home/enfermeria/familias', title: 'Familias', icon: 'person', class: 'bold' },
        { path: '/home/enfermeria/entrada/usuarios', title: 'Usuarios entrada', icon: 'format_list_numbered', class: 'bold' },   
 
      );
      if (userdata.calendar){
        ROUTES.push({ path: '/home/enfermeria/updatelink', title: 'link de citas', icon: 'link', class: 'bold' })
      }

    }
    else if (userdata.perfil == 3) {
    

      ROUTES.push(
        { path: '/home/comunicaciones/noticias', title: 'Noticias', icon: 'article', class: 'bold' },
        { path: '/home/comunicaciones/boletin', title: 'El Boletin', icon: 'article', class: 'bold' },
        { path: '/home/comunicaciones/upcomming', title: 'upcomming events', icon: 'article', class: 'bold' },
        { path: '/home/comunicaciones/reporteboletin', title: 'reporte boletin', icon: 'article', class: 'bold' },
        
      );
      if (userdata.calendar){
        ROUTES.push({ path: '/home/comunicaciones/updatelink', title: 'link de citas', icon: 'link', class: 'bold' })
      }

    }
    else if (userdata.perfil == 4) {
    

      ROUTES.push(
        { path: '/home/sistemas/usuarios', title: 'Usuarios', icon: 'person', class: 'bold' },
        { path: '/home/sistemas/familias', title: 'Familias', icon: 'person', class: 'bold' },
 
      );
      if (userdata.calendar){
        ROUTES.push({ path: '/home/sistemas/updatelink', title: 'link de citas', icon: 'link', class: 'bold' })
      }

    }
    else if (userdata.perfil == 5) {
    

      ROUTES.push(
        { path: '/home/consultas/entrada/usuarios', title: 'Usuarios entrada', icon: 'format_list_numbered', class: 'bold' },   
 
      );
      if (userdata.calendar){
        ROUTES.push({ path: '/home/consultas/updatelink', title: 'link de citas', icon: 'link', class: 'bold' })
      }

    }
    else if (userdata.perfil == 6) {
      ROUTES.push(
        { path: '/home/entrada/usuarios', title: 'Usuarios', icon: 'format_list_numbered', class: 'bold' },   
      );
      if (userdata.calendar){
        ROUTES.push({ path: '/home/entrada/updatelink', title: 'link de citas', icon: 'link', class: 'bold' })
      }

    }else{
      if (userdata.calendar){
        ROUTES.push({ path: '/home/entrada/updatelink', title: 'link de citas', icon: 'link', class: 'bold' })
      }
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
