import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatosdetablaComponent } from './datosdetabla/datosdetabla.component';
import { SkusComponent } from './skus/skus.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { EditComponent } from './edit/edit.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DatosdetablaComponent,
    SkusComponent,
    ArticulosComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
