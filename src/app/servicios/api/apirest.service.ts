import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
declare var $: any;
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  dominio = environment.dominio;
  token;
  header;
  tokenset="";
  user:any;
  constructor(private helper:JwtHelperService,
    private _http: HttpClient, 
    private router: Router
    , public auth : AuthService,
    private SpinnerService: NgxSpinnerService
    ) {
    this.cargartoken();
  }
  cargartoken() {
     this.tokenset = localStorage.getItem(environment.ISLOGGEDKEY);
        this.token = 'Bearer ' + localStorage.getItem(environment.ISLOGGEDKEY);
    this.header = { 'Authorization': this.token };

    if(this.token){
      let userTest = localStorage.getItem('currentUser');
      if (userTest) {
        this.user = JSON.parse(userTest);
      }  
    }

  }

  postdata(data, endpoint) {
     let isExpired = this.helper.isTokenExpired(this.tokenset);
     if(isExpired ){
       this.token="";
       this.tokenset="";
      this.auth.logout();
      this.notificaciones('warning',"Su sesión ha expirado");
     }

    return this._http.post<any>(`${this.dominio}${endpoint}`, data, { headers: this.header })
      .pipe(map(resp => {
        return resp;
      }));
  }

  getdata(endpoint) {
    

    if (!this.token) {
      this.cargartoken();
    }
    let isExpired = this.helper.isTokenExpired(this.tokenset);
     if(isExpired ){
      this.token="";
      this.tokenset="";
     this.auth.logout();
      this.notificaciones('warning',"Su sesión ha expirado");

     }
    return this._http.get<any>(`${this.dominio}${endpoint}`, { headers: this.header })
      .pipe(
        map(
          data => {
            return data;
          }
          )
      );

  }
  notificaciones(type,mensaje){
    //    const type = ['','info','success','warning','danger'];
    
    //    const color = Math.floor((Math.random() * 4) + 1);
    
        $.notify({
            icon: "notifications",
            message: mensaje
    
        },{
            type: type,
            placement: {
                from: 'top',
                align: 'right'
            },
            z_index: 3000,
            delay: 5000,
            timer: 1000,      
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }
}
