import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';
declare var $: any;
import Swal from 'sweetalert2';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

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
  datos_crear = {
    titulo_espanol: ''
    , titulo_ingles: ''
    , archivos: ''
    , archivosing: ''
    , id: 0
    , img_principal: ''
    , img_principaling: ''
    ,categoria:''
  }
  perfiles = [];
  tipos_pregunta = environment.tipos_pregunta;

  ImagenPrincipalspa;
  ImagenPrincipaling;
  Archivos = [];
  toFile;
  contador = 0;

  public source = '';
  public srcImagespa = '';
  public srcImageing = '';
  public url_image = '';

  public tiempo_spa;
  public tiempo_ing;

  inicial=1;
  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.cargarperfiles();
    this.cargarnoticias();
  }

  cargarnoticias() {
    this.api.getdata('todosnoticias').subscribe((items) => {
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


    }
    $('#exampleModalpublicacion').modal('show');
  }
  editar(item) {
    let newitem = item;
    this.datos_crear = newitem;
    this.srcImageing = this.datos_crear.img_principaling;
    this.srcImagespa = this.datos_crear.img_principal;
    $('#exampleModalpublicacion').modal('show');
  }

  cargarperfiles() {
    this.api.getdata('tiposPorClase?clase=noticias_categorias').subscribe((items) => {
      this.perfiles = items.data;
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
      title: 'Eliminar noticia',
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
        this.api.getdata('eliminarnoticia/' + id).subscribe((items) => {
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



  cargararchivo(file, tiempo) {
    return new Promise(resolve => {

      const contentType = file.type;
      const bucket = new S3(
        {
          accessKeyId: 'AKIA5XZBCSQRSOTELRDC',
          secretAccessKey: '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',
          region: 'us-east-2',

        }
      );

      let name = file.name;
      let lastDot = name.lastIndexOf('.');    
      let fileName = name.substring(0, lastDot);
      let ext = name.substring(lastDot + 1);
  
      const params = {
        Bucket: 'marymountapp/Noticias',
        Key: tiempo + this.textoaleatorio(10)+'.'+ext,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
      };
      let misvariables = this;
      bucket.upload(params, function (err, data) {
        misvariables.contador = misvariables.contador + 1;
        if (err) {
          console.log('EROOR: ', JSON.stringify(err));
          resolve(err);
          return err;
        }
        console.log('File Uploaded.', data);
        resolve(data);
        return data;
      });
    })
  }
  eliminiar() {
    const bucket = new S3(
      {
        accessKeyId: 'AKIA5XZBCSQRSOTELRDC',
        secretAccessKey: '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',
        region: 'us-east-2',

      }
    );
    const params = {
      Bucket: 'marymountapp',
      Key: "Publicaciones/Simulator2.png",
    };
    bucket.deleteObject(params, function (err, data) {
      if (err) {
        console.log('EROOR: ', JSON.stringify(err));
        return false;
      }
      console.log('File Uploaded.', data);
      return true;
    });
  }


  //------------------//---------------


  onChangeImagenPrincipalEsp(event) {
    this.tiempo_spa = new Date().getTime();
    this.ImagenPrincipalspa = event.target.files;
    this.projectImage(event.target['files'][0], 1);
  }

  onChangeImagenPrincipalIng(event) {
    this.tiempo_ing = new Date().getTime();
    this.ImagenPrincipaling = event.target.files;
    this.projectImage(event.target['files'][0], 2);
  }


  projectImage(file: File, tipo) {
    console.log("entro en la proyeccion", tipo,);
    let reader = new FileReader;
    reader.onload = (e: any) => {
      this.source = e.target.result;
      this.url_image = this.source;
      if (tipo == 1) {
        this.srcImagespa = this.url_image;
      } else {
        this.srcImageing = this.url_image;
      }
    };
    reader.readAsDataURL(file);
  }

  subir() {
    this.contador = 0;
    let mensaje = '';
    if (!this.datos_crear.titulo_espanol) {
      mensaje = '<br>Titulo en español es requerido';
    }
    if (!this.datos_crear.titulo_ingles) {
      mensaje = mensaje + '<br>Titulo en ingles es requerido';
    }
    if (!this.ImagenPrincipalspa) {
      mensaje = mensaje + '<br>Imagen principal para español es requerida';
    }

    if (!this.ImagenPrincipaling) {
      mensaje = mensaje + '<br>Imagen principal para ingles es requerida';
    }
    if (mensaje) {
      console.log(mensaje, this.datos_crear);
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }

    this.SpinnerService.show();
    const file1 = this.ImagenPrincipaling.item(0);
    const file2 = this.ImagenPrincipalspa.item(0);
    this.cargararchivo(file1, this.tiempo_spa).then((data) => {
      this.datos_crear.img_principaling = data['Location'];
      if (this.contador == 2) {
        this.subirtodo();
      }
    });
    this.cargararchivo(file2, this.tiempo_ing).then((data) => {
      this.datos_crear.img_principal = data['Location'];
      if (this.contador == 2) {
        this.subirtodo();
      }
    });



  }

  subirtodo() {
    setTimeout(() => {
      this.SpinnerService.show();
      this.api.postdata(this.datos_crear, this.datos_crear.id ? ('editarnoticia/' + this.datos_crear.id) : 'nuevanoticia').subscribe((respuesta) => {
        this.api.notificaciones('success', 'Información cargada exitosamente');
        if (!this.datos_crear.id) {
          this.data.push(respuesta.data);
          this.cargarnoticias();
        }
        this.datos_crear = {
          titulo_espanol: ''
          , titulo_ingles: ''
          , archivos: ''
          , id: 0
          , img_principal: ''
          , img_principaling: ''
          , archivosing: ''
          ,categoria:''

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
    }, 1000);
  }

  editarpublicacion() {
    this.contador = 0;

    let mensaje = '';
    if (!this.datos_crear.titulo_espanol) {
      mensaje = '<br>Titulo en español es requerido';
    }
    if (!this.datos_crear.titulo_ingles) {
      mensaje = mensaje + '<br>Titulo en ingles es requerido';
    }

    if (mensaje) {

      console.log(mensaje, this.datos_crear);
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }
    this.SpinnerService.show();



    let inicio = 0;
    if (this.ImagenPrincipalspa) {
      inicio = inicio + 1;
      const file1 = this.ImagenPrincipalspa.item(0);
      this.cargararchivo(file1, this.tiempo_spa).then((data) => {
        this.datos_crear.img_principal = data['Location'];
        if (this.contador == inicio) {
          console.log("se cargo todo :v");
          this.editartodo();
        }
      });
    }

    if (this.ImagenPrincipaling) {
      inicio = inicio + 1;
      const file2 = this.ImagenPrincipaling.item(0);
      this.cargararchivo(file2, this.tiempo_ing).then((data) => {
        this.datos_crear.img_principaling = data['Location'];
        if (this.contador == inicio) {
          console.log("se cargo todo :v");
          this.editartodo();
        }
      });
    }


    if (!inicio) {
      this.editartodo();
    }
  }
  editartodo() {
    setTimeout(() => {
      this.SpinnerService.show();
      this.api.postdata(this.datos_crear, this.datos_crear.id ? ('editarnoticia/' + this.datos_crear.id) : 'nuevanoticia').subscribe((respuesta) => {
        this.api.notificaciones('success', 'Información cargada exitosamente');
        if (!this.datos_crear.id) {
          this.data.push(respuesta.data);
        }
        this.datos_crear = {
          titulo_espanol: ''
          , titulo_ingles: ''
          , archivos: ''
          , id: 0
          , img_principal: ''
          , img_principaling: ''
          , archivosing: ''
          ,categoria:''

        }
        $('#exampleModalpublicacion').modal('hide');

        this.SpinnerService.hide();
        setTimeout(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        }, 1000);

      }, err => {
        this.SpinnerService.hide();

        if (err.status == 410) {

          this.api.notificaciones('danger', 'Ha ocurrido un error<br>' + err['error']['message']);

          return;
        }

        this.api.notificaciones('danger', 'Ha ocurrido un error<br>' + err['message']);
        console.log('error', err);

      });
    }, 1000);
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