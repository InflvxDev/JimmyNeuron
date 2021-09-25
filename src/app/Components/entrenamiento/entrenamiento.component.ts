import { Component, OnInit, ViewChild } from '@angular/core';
import { Entrenamiento } from 'src/app/Models/Entrenamiento';
import { Neurona } from 'src/app/Models/Neurona';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.css']
})
export class EntrenamientoComponent implements OnInit {
  Nentradas : number;
  Nsalidas : number;
  Npatrones : number;
  datosNeuronas: Neurona[] = [];
  Neurona : Neurona;
  datosEntrenamiento: Entrenamiento;
  fileContent: string | ArrayBuffer = '';
  constructor() {
    this.datosEntrenamiento = new Entrenamiento();
   }

  ngOnInit(): void {
  }
  

  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
        
        self.fileContent = fileReader.result;
        console.log(typeof(self.fileContent));
        
        var s = self.fileContent.toString().split('\r\n');
        for (var index = 0; index < s.length; index++) {
          var w = s[index].toString().split(';');
           // console.log(w);
           var j = 0;
          while (w.length > j) {
             var entradas = w[j].toString().split(',');
              var salidas = w[j+1].toString().split(',');
        
            j = w.length + 1;
          }
 
          self.ParsearEntradasySalidas(entradas, salidas);
       } 
        console.log(self.fileContent);
        console.log(self.datosNeuronas);
        self.Npatrones = self.datosNeuronas.length;
        self.Nsalidas = self.datosNeuronas[0].Salidas.length;
        self.Nentradas = self.datosNeuronas[0].Entradas.length;
    }
    
    fileReader.readAsText(file);
    
  }
 
  public Entrenamiento(){
    
  }
  

  public ParsearEntradasySalidas(entradas, salidas){
    this.Neurona = new Neurona();

    for (let index = 0; index < entradas.length; index++) {

      this.Neurona.Entradas.push(parseInt(entradas[index]));
    }
    for (let index = 0; index < salidas.length; index++) {

      this.Neurona.Salidas.push(parseInt(salidas[index]));
    }

    this.datosNeuronas.push(this.Neurona);
    
  }
  

}
