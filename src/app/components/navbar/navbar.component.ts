import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { title } from 'process';
import Swal from 'sweetalert2';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(
        location: Location,  
        private element: ElementRef, 
        private router: Router,
        private api: ApirestService,
        private SpinnerService: NgxSpinnerService) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      if(titlee.indexOf('detallesusuario')>-1){
        return 'Actualizar usuario';
      }

      if(titlee.indexOf('reportes')>-1){
        return 'Resumen Diarios de Encuestas';
      }
      if(titlee.indexOf('indicadores')>-1){
        return 'Reporte Diario de Casos Confirmados y Recuperados';
      }

      if(titlee.indexOf('coomovidad')>-1){
        return 'Grafico de Respuestas de la Encuesta';
      }

      if(titlee.indexOf('formularios')>-1){
        return 'Formularios';
      }

      if(titlee.indexOf('formularios')>-1){
        return 'Formularios';
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      if(titlee.indexOf('tecnicos')>-1){
        return 'AVANCES TECNICOS';
      }
      if(titlee.indexOf('resume')>-1){
        return 'RESUMEN DE EMPRESA';
      }
      if(titlee.indexOf('tecnico')>-1){
        return 'RESUMEN TECNICO';
      }
      if(titlee.indexOf('financiero')>-1){
        return 'RESUMEN FINANCIERO';
      }
      
      return 'Dashboard';
    }
    cerrarsesion(){
        Swal.fire({
            title: 'Cerrar Sesión',
            text: "Esta a punto de cerrar su sesión!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                this.api.auth.logout();
              Swal.fire('Exitoso!', 'Sesión cerrada.', 'success');
            }
          });
    }
}
