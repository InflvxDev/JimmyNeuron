import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrenamientoComponent } from './Components/entrenamiento/entrenamiento.component';



const routes: Routes = [{path: "**", component: EntrenamientoComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
