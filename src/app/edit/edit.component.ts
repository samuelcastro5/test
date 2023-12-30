
import { Component, OnInit } from '@angular/core';
import { Sku } from '../modelos/sku.interface';
import { ApiService } from '../service/api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Departamento } from '../modelos/departamento.interface';
import { Familia } from '../modelos/familia.interface';
import { Clase } from '../modelos/clase.interface';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  nuevoForm: FormGroup;
  ocultarD: boolean;
  datosSku: number;



  constructor(private api: ApiService, private router: Router, private formBuilder: FormBuilder, private activerouter: ActivatedRoute) {
    this.ocultarD = false;
    this.datosSku = 0;
    

    this.nuevoForm = new FormGroup({
      id: new FormControl(''),
      sku: new FormControl('', [Validators.maxLength(6), Validators.required, Validators.minLength(1)]),
      article: new FormControl('', [Validators.maxLength(15), Validators.required, Validators.minLength(1)]),
      stl_marca: new FormControl('', [Validators.maxLength(15), Validators.required, Validators.minLength(1)]),
      model: new FormControl('', [Validators.maxLength(20), Validators.required, Validators.minLength(1)]),
      departamento_id: new FormControl('', [Validators.required]),
      clase_id: new FormControl('', [Validators.required]),
      familia_id: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.maxLength(9), Validators.required, Validators.minLength(1)]),
      amount: new FormControl('', [Validators.maxLength(9), Validators.required, Validators.minLength(1)]),
      discontinued: new FormControl(''),
      create_date: new FormControl(''),
      finish_date: new FormControl('')
    });
    this.nuevoForm.get("sku")?.valueChanges.subscribe(x => {
      if(!this.activerouter.snapshot.paramMap.get('id')){
        if(x.toString().length==6){
        
          this.api.getDataBySku(Number(x)).subscribe(data=> {
    
            if(data != null){
              this.nuevoForm.controls["sku"].setValue("");
              alert("SKU YA EXISTE..");
            }
          });
        }

      }
     
   })
  }
  listadepartamento: Departamento[] = [];
  listafamilia: Familia[] = [];
  listaclase: Clase[] = [];
  
  ngOnInit(): void {
    let skuId = this.activerouter.snapshot.paramMap.get('id');
    

    this.api.getDepartamentos().subscribe(data => {
      this.listadepartamento = data;
    });


    
    if (skuId) {
     this.api.getFamilia().subscribe(data => {
        this.listafamilia = data;
      });
      this.api.getClase().subscribe(data => {
        this.listaclase = data;
      });
      this.ocultarD = true;
      this.api.getSkuById(skuId).subscribe(data => {
        this.nuevoForm.setValue({
          id: data.id,
          sku: data.sku,
          article: data.article,
          stl_marca: data.stl_marca,
          model: data.model,
          departamento_id:data.departamento_id,
          clase_id:data.clase_id,
          familia_id:data.familia_id,
          stock: data.stock,
          amount: data.amount,
          discontinued: data.discontinued,
          create_date: data.create_date,
          finish_date: data.finish_date
        });

      })
    }
  }
  OnChangeDepartamento(value:any){
    if(value.target.value != null && value.target.value != ""){
      this.api.getClaseByDepartamento(value.target.value).subscribe(data => {
        this.listaclase = data;
      })
    }


  }

  OnChangeClase(value:any){
    if(value.target.value != null && value.target.value != ""){
  
      this.api.getFamiliaByClase(value.target.value).subscribe(data => {
        this. listafamilia = data;
      })
    }


  }

  postForm(form: Sku) {
    console.log(form.departamento_id);
    if (form.amount > form.stock) {
      alert("la cantidad no debe ser mayor al stock");
    }
    else if (form.sku.toString() == "") {
      alert("FAVOR DE CAPTURAR UN SKU");
    }
    else if (form.sku.toString().length != 6) {
      alert("FAVOR DE CAPTURAR UN SKU DE 6 DIGITOS");
    }
    else if (form.article.toString() == "") {
      alert("FAVOR DE ESCRIBIR UN ARTICULO...")
    }
    else if (form.stl_marca.toString() == "") {
      alert("FAVOR PONER LA MARCA...")
    }
    else if (form.model.toString() == "") {
      alert("FAVOR DE ESCRIBIR EL MODELO...")
    }
    else if (form.departamento_id.toString() == "") {
      alert("FAVOR DE PONER EL DEPARTAMENTO...")
    }
    else if (form.clase_id.toString()=="") {
      alert("FAVOR DE PONER EL NUMERO DE CLASE...")


    }//editado borrar en caso de no usarse
    else if (form.familia_id.toString() == "") {
      alert("FAVOR DE PONER EL NUMERO DE FAMILIA...")

    }
    else if (form.stock.toString() == "") {
      alert("FAVOR DE ESCRIBIR UN STOCK...")

    }
    else if (form.amount.toString() == "") {
      alert("FAVOR DE ESCRIBIR UNA CANTIDAD...")
    }
    else {
      if (form.id) {
        this.api.updateSku(form);
      }
      else {
         this.api.saveSku(form);
          this.salir();   
      }



    }

  }

  salir() {
    this.router.navigate(['tabla']);

  }

 

}
