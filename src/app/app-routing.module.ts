import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosdetablaComponent } from './datosdetabla/datosdetabla.component';
import { SkusComponent } from './skus/skus.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: '', redirectTo:'tabla' , pathMatch:'full'  },
  {path: 'tabla', component: DatosdetablaComponent },
  { path: 'skus', component: SkusComponent},
  {path: 'articulos', component: ArticulosComponent},
  { path: 'edit', component: EditComponent},
  { path: 'edit/:id', component: EditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
