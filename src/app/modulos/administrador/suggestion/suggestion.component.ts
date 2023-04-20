import { Component, OnInit, ViewChild } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';
declare var $: any;
import Swal from 'sweetalert2';


@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })

  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  public data = [];
  title = 'angulardatatables'; 
  orden = -1;
  ordening = -1;
  dtOptions: DataTables.Settings = {
    language: {
      url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  };
  
  dtTrigger: Subject<any> = new Subject();
  datos_crear:any = {
    titulo: ''
    , titulo_ingles: ''
    , archivos: ''
    , archivosing: ''
    , id: 0
    , img_principal: ''
    , img_principaling: ''
    ,categoria:'',
    anotacion:''
  }
  perfiles = [];
  tipos_pregunta = environment.tipos_pregunta;

  ImagenPrincipalspa;
  ImagenPrincipaling;
  Archivos = [];
  toFile;
  contador = 0;
  prefijoImg=environment.prefijoImg;
  public source = '';
  public srcImagespa = '';
  public srcImageing = '';
  public url_image = '';

  public tiempo_spa;
  public tiempo_ing;

  inicial=1;

  showImages = [];
  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.cargarperfiles();
    this.cargarnoticias();
  }

  cargarnoticias() {
    this.api.getdata('allsugerencias').subscribe((items) => {
      console.log(items,'sugg')
      this.data = items.data;
      if(this.inicial>1){
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      }else{
        this.dtTrigger.next();    
      }
      this.inicial=2;
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {
        });
      }
    });
  }

  crearnuevo() {
    this.srcImageing = '';
    this.srcImagespa = '';

    this.datos_crear = {
      titulo_espanol: ''
      , titulo_ingles: ''
      , archivos: ''
      , id: 0
      , img_principal: ''
      , img_principaling: ''
      , archivosing: ''
      ,categoria:''
      ,titulo:''
      ,enlace:''
      ,texto:''
      ,date_new:'',
      date_publicacion:'',
      date_retiro:'',
      tipo:1,
      principal:2,
      anotacion:''


    }
    this.ImagenPrincipalspa = null;
    this.srcImagespa = null;

    this.perfiles.forEach((it)=>{
      it.selected = false
  })

    $('#exampleModalpublicacion').modal('show');
  }
  editar(item) {
    let newitem = item;
    this.datos_crear = newitem;
    console.log(this.datos_crear);
    $('#exampleModalpublicacion').modal('show');
  }

  cargarperfiles() {
    this.api.getdata('tiposPorClase?clase=perfiles').subscribe((items) => {
      this.perfiles =items.data.map((item)=>{
        return {
          ...item,
          selected:false
        }
      })

    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {
        });
      }
    });
  }

  buscarperfil(perfil) {
    let perfilnuevo = this.perfiles.filter((elem) => {
      return elem.valor == perfil
    })
    if(perfilnuevo.length){
      return perfilnuevo[0]['texto']
    }else{
      return "";
    }
  }

  eliminaritem(id) {
    Swal.fire({
      title: 'Eliminar evento en la app',
      text: "Esta accion no puede ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.SpinnerService.show();
        this.api.getdata('deleteUpcommig/' + id).subscribe((items) => {
          this.SpinnerService.hide();
          this.data = this.data.filter((ele) => {
            return ele.id != id;
          })
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        }, err => {
          this.SpinnerService.hide();
          if (err.status == 422) {
            err.errors.forEach(element => {

            });
          }
          console.log('err', err);
        });

      }
    });
  }


  onChangeImagenPrincipalEsp(event) {
    this.tiempo_spa = new Date().getTime();
    this.ImagenPrincipalspa = event.target.files;
    this.projectImage(event.target['files'][0], 1);
  }

  projectImage(file: File, tipo) {
    console.log("entro en la proyeccion", tipo,);
    let reader = new FileReader;
    reader.onload = (e: any) => {
      this.source = e.target.result;
      this.url_image = this.source;
      if (tipo == 1) {
        this.srcImagespa = this.url_image;
        this.showImages.push(this.url_image);
        console.log(this.showImages)
      } else {
        this.srcImageing = this.url_image;
      }
    };
    reader.readAsDataURL(file);
  }


  editarpublicacion() {
    this.contador = 0;
    this.contador = 0;
    let mensaje = '';

    if (!this.datos_crear.anotacion) {
      mensaje = '<br>anotacion es requerido';
    }

    


    if (mensaje) {
      console.log(mensaje, this.datos_crear);
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }

    const body = {
      anotacion:this.datos_crear.anotacion,
      id:this.datos_crear.id
    }
    this.api.postdata(body, 'editAnotacion').subscribe((respuesta) => {
      this.api.notificaciones('success', 'Información cargada exitosamente');
        this.cargarnoticias();
      this.datos_crear = {
        titulo_espanol: ''
        , titulo_ingles: ''
        , archivos: ''
        , id: 0
        , img_principal: ''
        , img_principaling: ''
        , archivosing: ''
        ,categoria:''
        ,titulo:''
        ,enlace:''
        ,texto:''
        ,date_new:'',
        date_publicacion:'',
        date_retiro:'',
        anotacion:''    
      }
      $('#exampleModalpublicacion').modal('hide');
      this.SpinnerService.hide();

    }, err => {
      this.SpinnerService.hide();

      if (err.status == 410) {

        this.api.notificaciones('danger', 'Ha ocurrido un error<br>' + err['error']['message']);

        return;
      }

      this.api.notificaciones('danger', 'Ha ocurrido un error<br>' + err['message']);
      console.log('error', err);

    });

  }

  textoaleatorio(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
}