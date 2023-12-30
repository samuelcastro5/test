import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import {Sku} from '../modelos/sku.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Departamento } from '../modelos/departamento.interface';
import { Familia } from '../modelos/familia.interface';
import { Clase } from '../modelos/clase.interface';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://localhost:8080/api/skus';
  private urlService = 'http://localhost:8080/api';
  private  status = "";
  private  errorMessage = "";

  constructor(private http: HttpClient) { }

  public getData() : Observable<Sku[]> {
    return this.http.get<Sku[]>(this.urlApi);
  }

  public getDepartamentos() : Observable<Departamento[]> {
    let ruta = this.urlService + "/departamentos"
    return this.http.get<Departamento	[]>(ruta);
  }

  public getFamilia() : Observable<Familia[]> {
    let ruta = this.urlService + "/familia";
    return this.http.get<Familia[]>(ruta);
  }

  public getClase() : Observable<Clase[]> {
    let ruta = this.urlService + "/clas";
    return this.http.get<Clase[]>(ruta);
  }

  public getClaseByDepartamento(departamento:number) : Observable<Clase[]> {
    let ruta = this.urlService + "/clas/clase/"+departamento;
    return this.http.get<Clase[]>(ruta);
  }

  public getFamiliaByClase(clase:number) : Observable<Familia[]> {
    let ruta = this.urlService + "/familia/familia/"+clase;
    return this.http.get<Familia[]>(ruta);
  }



  public getSkuById(id: String) : Observable<Sku> {
    return this.http.get<Sku>(this.urlApi+"/"+ id);
  }

  public getDataBySku(sku:number) : Observable<Sku> {
    return this.http.get<Sku>(this.urlApi+ "/sku/" + sku);
  }


    public deleteproduct (id: number): void{
      let ruta = 'http://localhost:8080/api/skus/'+ id;
      this.http.delete(ruta)
        .subscribe({
            next: data => { 
                this.status = 'Delete successful';
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
        });
      console.log(ruta);
      
      

    }
    saveSku(form:Sku): void{
      console.log(form);
      this.http.post(this.urlApi,form)
        .subscribe({
            next: data => { 
                this.status = 'Save successful';
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
        });
    }

    updateSku(form:Sku): void{
      console.log(form);
      this.http.put(this.urlApi+"/"+ form.id,form)
        .subscribe({
            next: data => { 
                this.status = 'Save successful';
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
        });
    }
    /*updateclase(form:Sku): void{
      console.log(form);
      this.http.put(this.urlApi+"/"+ form.clas,form)
        .subscribe({
            next: data => { 
                this.status = 'Save successful';
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
        });
    }*/
}
