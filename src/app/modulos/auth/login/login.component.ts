import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/servicios/auth/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={
    email:'',
    password:''
  };
  constructor(
    private SpinnerService: NgxSpinnerService, 
    public authservice: AuthService,
    private toastr: ToastrService,
    private router: Router) {

   }

  ngOnInit(): void {
  }
  iniciarsesion(){
    this.SpinnerService.show();
    this.authservice.login();
    this.authservice.loginhttp(this.user).subscribe((userdata)=>{
      console.log(userdata );
      console.log(userdata.user.perfil_aplicacion);
      if(userdata.user.perfil_aplicacion==1){//adminitradot
        this.toastr.success('Bienvenido '+userdata.user.name, 'Sesión iniciada para administrador');
        this.router.navigate(['/home/administrador/preguntas']);

      }else if (userdata.user.perfil_aplicacion==2){
        this.toastr.success('Bienvenido '+userdata.user.name, 'Sesión iniciada para enfermería');
        this.router.navigate(['/home/enfermeria/preguntas']);
        
      }else if (userdata.user.perfil_aplicacion==4){
        this.toastr.success('Bienvenido '+userdata.user.name, 'Sesión iniciada para sistemas');
        this.router.navigate(['/home/sistemas/usuarios']);
        
      }else if (userdata.user.perfil_aplicacion==3){
        this.toastr.success('Bienvenido '+userdata.user.name, 'Sesión iniciada para comunicaciones');
        this.router.navigate(['/home/comunicaciones/noticias']);
        
      }else if (userdata.user.perfil_aplicacion==5){
        this.toastr.success('Bienvenido '+userdata.user.name, 'Sesión iniciada para consultas');
        this.router.navigate(['/home/consultas/reportes']);
        
      }else if (userdata.user.perfil_aplicacion===6){
        console.log("entro");
        this.toastr.success('Bienvenido '+userdata.user.name, 'Sesión iniciada para entrada');
        this.router.navigate(['/home/entrada/usuarios']);
        
      }else {
        this.toastr.warning(`${userdata.user.name} ud aun no se encuentra activo para operar`, 'Sesión iniciada');
        this.authservice.logout();
      }
//      this.toastr.success('Bienvenido '+userdata.user.name, 'Sesión iniciada');      
//      this.router.navigate(['/home']);
this.SpinnerService.hide();
},err=>{
      this.SpinnerService.hide();
      this.toastr.error(err.error.message, 'Ha ocurrido un error');
      console.log('errdata',err);
    });
  }

}

