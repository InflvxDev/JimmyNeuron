import { Component, OnInit, ViewChild} from '@angular/core';
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

  iniciarEntrenamiento : boolean = true;
  iniciarNeurona: boolean = true;
  iniciarSimulacion: boolean = true;
  constructor() {
    this.datosEntrenamiento = new Entrenamiento();
   
   }

  ngOnInit(): void {
  }
   //--------------------------------Cargar Archivo------------------------------------------- 

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
        self.iniciarNeurona = false;
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



  //--------------------------------Grafica-------------------------------------------

  

  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;

  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

 multi = [
    {
      "name": "Error",
      "series": [
        {
          "name": "1",
          "value": 0.04
        },
        {
          "name": "10",
          "value": 0.03
        },
        {
          "name": "20",
          "value": 0.02
        }
      ]
    }
  ];
  

  // onSelect(data : any): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data : any): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data : any): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }

  //--------------------------------ENTRENAMIENTO-------------------------------------------

  public inicializarpesos(){
    for (let index = 0; index < this.Nentradas; index++) {
      this.datosEntrenamiento.Pesos.push(this.ramdomizarpesos());
    }
    console.log(this.datosEntrenamiento.Pesos);
    this.iniciarEntrenamiento = false;
    this.iniciarNeurona = true;
  }

  public ramdomizarpesos(){
    var numero = Math.random() * (1 - (-1)) + -1;
    console.log(numero);
    return numero
  }

}
