import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntrenamientoComponent } from './Components/entrenamiento/entrenamiento.component';
import { SimulacionComponent } from './Components/simulacion/simulacion.component';
import { SimulacionEnfermedadesComponent } from './Components/simulacion-enfermedades/simulacion-enfermedades.component';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';







@NgModule({
  declarations: [
    AppComponent,
    EntrenamientoComponent,
    SimulacionComponent,
    SimulacionEnfermedadesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxChartsModule    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
