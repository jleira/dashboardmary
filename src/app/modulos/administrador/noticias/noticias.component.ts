import { Component, OnInit, ViewChild } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';
declare var $: any;
import Swal from 'sweetalert2';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  files: File[] = [];

  @ViewChild(DataTableDirective, { static: false })

  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  public data = [];
  title = 'angulardatatables';
  orden = -1;
  ordening = -1;
  indexSelected = 0;
  dtOptions: DataTables.Settings = {
    language: {
      url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  };
  position =null;
  dtTrigger: Subject<any> = new Subject();
  datos_crear:any = {
    titulo: ''
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
  prefijoImg=environment.prefijoImg;
  public source = '';
  public srcImagespa = [];
  public srcImageing = '';
  public url_image = '';

  public tiempo_spa;
  public tiempo_ing;

  inicial=1;

  imagenSelected = 0 ;
  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.cargarperfiles();
    this.cargarnoticias();
  }

  cargarnoticias() {
    this.api.getdata('allNews').subscribe((items) => {
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
    this.srcImagespa = [];

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
      tipo:1,
      principal:1

    }
    this.ImagenPrincipalspa = null;
    this.srcImagespa = [];
    this.perfiles.forEach((it)=>{
        it.selected = false
    })

    $('#exampleModalpublicacion').modal('show');
  }
  editar(item,position) {
    console.log('entro')
    this.position = position;
    let newitem = item;
    this.datos_crear = newitem;
    this.srcImagespa[0] =this.prefijoImg+this.datos_crear.imagen;
    this.perfiles.forEach((it)=>{
      if(item.categorias?.indexOf(it.valor)>-1){
        it.selected = true
      }else{
        it.selected = false
      }
    })
    $('#exampleModalpublicacion').modal('show');
  }

  editarI(item,position) {
    this.imagenSelected = 0;
    this.position = position;
      
    let newitem = JSON.parse(JSON.stringify(item));
    if(newitem.imagen){
      newitem.imagen = newitem.imgp+','+newitem.imagen;
    }else{
      newitem.imagen = newitem.imgp;

    }

    this.datos_crear = newitem;
    
    
    this.srcImagespa[0] =this.prefijoImg+this.datos_crear.imgp;


    this.perfiles.forEach((it)=>{
      if(item.categorias?.indexOf(it.valor)>-1){
        it.selected = true
      }else{
        it.selected = false
      }
    })
    $('#exampleModalImagenes').modal('show');
  }

  editarAdd(item,position) {
    this.position = position;
    let newitem = item;
    this.datos_crear = newitem;
    this.srcImagespa= [];
    
    this.perfiles.forEach((it)=>{
      if(item.categorias?.indexOf(it.valor)>-1){
        it.selected = true
      }else{
        it.selected = false
      }
    })
    $('#exampleModalImagenesAdd').modal('show');
  }

  cargarperfiles() {
    this.api.getdata('tiposPorClase?clase=perfiles').subscribe((items) => {
      this.perfiles =items.data.map((item)=>{
        return {
          ...item,
          selected:false
        }
      })
      console.log(this.perfiles)
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
        this.api.getdata('deleteNews/' + id).subscribe((items) => {
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
    this.srcImagespa= [];
    console.log(event.target.files)
    this.indexSelected= 0;
    for (let index = 0; index<this.ImagenPrincipalspa.length; index++) {
        this.projectImage(event.target['files'][index],index==0?true:false);      
    }
  }

  projectImage(file: File, principal) {
    console.log(file)
    if(file){
      console.log("entro en la proyeccion");
      let reader = new FileReader;
      reader.onload = (e: any) => {
        console.log('perfecto')
        this.source = e.target.result;
        this.url_image = this.source;
        this.srcImagespa.push({img:this.url_image, selected:principal});
        console.log('src',this.srcImagespa)
      };
      reader.readAsDataURL(file);
    }

  }
  crear2() {
    console.log(this.srcImagespa,'test img ',this.ImagenPrincipalspa)

    if(this.ImagenPrincipalspa.length > 1){
      console.log('buscando imagen principal', this.indexSelected)
      const imagen_principal = this.ImagenPrincipalspa[this.indexSelected];
      console.log('imagen_principal1')
      console.log(imagen_principal)
      console.log('imagen_principal2')
      let newImage= [];
      for (let index = 0; index < this.ImagenPrincipalspa.length; index++) {
        if(index != this.indexSelected){
          newImage.push(this.ImagenPrincipalspa[index])
        }
      }
      console.log(newImage)

    }
  }

  crear() {
    this.contador = 0;
    let mensaje = '';
    const perfilesS =this.perfiles.filter((f)=> f.selected).map((m)=> {return m.valor}).join(); 

    if (!this.datos_crear.titulo) {
      mensaje = '<br>Titulo es requerido';
    }

    if (!this.datos_crear.date_new) {
      mensaje = '<br>Fecha de noticia es requerida';
    }
    
    if (!this.files?.length) {
      mensaje = mensaje + '<br>Imagen principal para español es requerida';
    }

    if (!perfilesS) {
      mensaje = mensaje + '<br>Debe seleccionar al menos un categoria';
    }

    if (mensaje) {
      console.log(mensaje, this.datos_crear);
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }

    const formData = new FormData();


    console.log(this.perfiles,perfilesS)


    if(this.files.length > 1){
      console.log('buscando imagen principal', this.indexSelected)
      const imagen_principal = this.files[this.indexSelected];
      let newImage= [];
      for (let index = 0; index < this.files.length; index++) {
        if(index != this.indexSelected){
          newImage.push(this.files[index])
          formData.append('file'+(index-1), this.files[index]);

        }
      }
      formData.append('filesSecondary', String(this.files.length - 1));
      formData.append('titulo', this.datos_crear.titulo);
      formData.append('file', imagen_principal);

    }else{
      formData.append('file', this.files[0]);
    }

    formData.append('titulo', this.datos_crear.titulo);
    formData.append('enlace', this.datos_crear.enlace);
    formData.append('texto', this.datos_crear.texto);
    formData.append('date_new', this.datos_crear.date_new);
    formData.append('tipo', this.datos_crear.tipo);
    formData.append('principal', this.datos_crear.principal);
    formData.append('categorias', perfilesS);
    


   this.SpinnerService.show();

    this.api.postdata(formData, 'newNews').subscribe((respuesta) => {
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
        ,titulo:''
        ,enlace:''
        ,texto:''
        ,date_new:''    
      }
      this.ImagenPrincipalspa = null;
      this.files= [];
      this.srcImagespa = [];
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

  editarpublicacion() {
    this.contador = 0;
    this.contador = 0;
    let mensaje = '';
    const perfilesS =this.perfiles.filter((f)=> f.selected).map((m)=> {return m.valor}).join(); 

    if (!this.datos_crear.titulo) {
      mensaje = '<br>Titulo es requerido';
    }

    if (!this.datos_crear.date_new) {
      mensaje = '<br>Fecha de noticia es requerida';
    }
    if (!perfilesS) {
      mensaje = mensaje + '<br>Debe seleccionar al menos un categoria';
    }
    


    if (mensaje) {
      console.log(mensaje, this.datos_crear);
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }


    console.log(this.ImagenPrincipalspa, this.datos_crear);
    const formData = new FormData();

  
    formData.append('id', this.datos_crear.id);
    formData.append('titulo', this.datos_crear.titulo);
    formData.append('enlace', this.datos_crear.enlace);
    formData.append('texto', this.datos_crear.texto);
    formData.append('date_new', this.datos_crear.date_new);
    formData.append('tipo', this.datos_crear.tipo);
    formData.append('principal', this.datos_crear.principal);
    formData.append('categorias', perfilesS);

    this.api.postdata(formData, 'editNews').subscribe((respuesta) => {
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
        ,date_new:''    
      }
      this.ImagenPrincipalspa = null;
      this.srcImagespa = [];
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

 changeImg(i){
  this.srcImagespa = this.srcImagespa.map((imgs)=>{
return {img:imgs.img, selected:false}
  })
  this.indexSelected= i;
  this.srcImagespa[i].selected = true;
 }

 getImages(img)
 {
  if(img){
    return img.split(',');
  }
  return []
 }

 editarOrdenImagenes(){

  const imgp = this.datos_crear.imagen.split(',')[this.imagenSelected];
  const imagen = this.datos_crear.imagen.split(',');
  imagen.splice(this.imagenSelected,1)

  const formData = new FormData();

  
  formData.append('id', this.datos_crear.id);
  formData.append('imgp', imgp);
  formData.append('imagen', imagen);

  this.api.postdata(formData, 'editNewsImage').subscribe((respuesta) => {
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
      ,date_new:''
      ,imagen:''

    }
    this.ImagenPrincipalspa = null;
    this.srcImagespa = [];
    $('#exampleModalImagenes').modal('hide');
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

 editarAddImagenes(){
  const formData = new FormData();



  if(!this.files?.length){
    this.api.notificaciones('warning', "Debe cargar una imagen<br>" );
    return;
  }
    let newImage= [];
    for (let index = 0; index < this.files.length; index++) {
        newImage.push(this.files[index])
        formData.append('file'+(index), this.files[index]);
    }
    formData.append('filesSecondary', String(this.files.length));

  formData.append('id', this.datos_crear.id);
  const imagen = this.datos_crear.imagen;
  formData.append('imagen', imagen);

  this.api.postdata(formData, 'editNewsaddImage').subscribe((respuesta) => {
    this.files = [];
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
      ,date_new:''
      ,imagen:''

    }
    this.ImagenPrincipalspa = null;
    this.srcImagespa = [];
    $('#exampleModalImagenesAdd').modal('hide');
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

 eliminarItmen(index){
   const datos =  this.datos_crear.imagen.split(',');
   datos.splice(index,1);
   this.datos_crear.imagen=datos.join(',');
 }

 subir(item){
  let datos =  this.datos_crear.imagen.split(',');
  const ant = datos [item-1];
  datos[item-1]=datos[item];
  datos[item]=ant;
  this.datos_crear.imagen=datos.join(',');
}

onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

}