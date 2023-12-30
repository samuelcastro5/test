import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../service/api.service';

import { Router } from '@angular/router';
import { Sku } from '../modelos/sku.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datosdetabla',
  templateUrl: './datosdetabla.component.html',
  styleUrls: ['./datosdetabla.component.css']
})
export class DatosdetablaComponent implements OnInit {

  tablaform = new FormGroup({
    num_dep: new FormControl('', Validators.required),
    nom_dep: new FormControl('', Validators.required)
  })

  constructor(private api: ApiService, private router: Router) {

  }

  listasku: Sku[] = [];


  ngOnInit(): void {
    this.llenartabla();




  }

  llenartabla() {
    this.api.getData().subscribe(data => {
      this.listasku = data;
    });
  }

  producto() {
    this.router.navigate(['edit']);
  }

  eliminar(event: any, id: number): void {
    if (confirm("ESTAS SEGURO DE ELIMINAR EL REGISTRO? ")) {
      this.api.deleteproduct(id);
      this.llenartabla();
      
    }
   }

   editar(id:number) : void {
    this.router.navigate(['edit',id]);
   }



}
