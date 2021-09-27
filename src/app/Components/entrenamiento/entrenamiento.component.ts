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
  MostrarTabla: boolean = false;

  PesosEntrenamiento: number[] = [];

  Niteraccion: number;
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

  //options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Iteracciones';
  yAxisLabel: string = 'Error';
  xAxisLabel2: string = 'NumeroPatrones';
  yAxisLabel2: string = 'Salidas';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  multi = [
    
    {
      "name": "ErroresIteraccion",
      "series": [
        {
          "name": "0",
          "value": 1
        },
      ]
    }
  ]

  multi2 = [
    
    {
      "name": "Salida Esperada",
      "series": [
        {
          "name": "0",
          "value": 0
        },
      ]
    },
    {
      "name": "Salida Red",
      "series": [
        {
          "name": "0",
          "value": 0
        },
      ]
    }
  ]


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  //--------------------------------ENTRENAMIENTO-------------------------------------------

  public inicializarpesos(){
    for (let index = 0; index < this.Nentradas; index++) {
      this.datosEntrenamiento.Pesos.push(Math.random() * (2) - 1);
    }

    this.iniciarEntrenamiento = false;
    this.iniciarNeurona = true;
  }

 

  public Entrenamiento(){
    this.Neurona = new Neurona();
    this.PesosEntrenamiento = this.datosEntrenamiento.Pesos;
    this.Niteraccion =1;
    var ERMS = 1;
    var yr = 0;
    var el = 0;
    var ep = 0;
    var sumep;


    while (this.Niteraccion <= this.datosEntrenamiento.IteracionesMax && ERMS > this.datosEntrenamiento.Error ) {
      console.log("----------------ITERACCION N°: "+ this.Niteraccion+" -------------------------");
      sumep = 0;
      ERMS = 0;
      console.log("PESOS ACTUALES: "+ this.PesosEntrenamiento.join(","));
      for (let index = 0; index < this.Npatrones; index++) {
        this.Neurona = this.datosNeuronas[index];
        yr = this.calcularYr(this.calcularS(this.PesosEntrenamiento,this.Neurona.Entradas),this.datosEntrenamiento.FuncionActivacion)
        
        
        el = this.Neurona.Salidas[0] - yr
        ep = Math.abs(el)/this.Nsalidas;

        sumep += ep;
        
        console.log("ENTRADAS: "+ this.Neurona.Entradas.join(","));
        console.log("Salida Esperada: "+ this.Neurona.Salidas[0] + " Salida de la red: "+ yr);
        console.log("Error del Lineal: "+ el);
        
        for (let index = 0; index < this.Neurona.Entradas.length; index++) {


          this.PesosEntrenamiento[index] += this.datosEntrenamiento.RataAprendizaje * el * this.Neurona.Entradas[index];

        }
        

        
      }
      console.log("PESOS NUEVOS: "+ this.PesosEntrenamiento.join(","));

      ERMS = sumep/this.Npatrones;
      console.log("Error Iteracion: "+ERMS);

      let copy = this.multi;
      copy[0].series.push({ name: this.Niteraccion.toString(), value: ERMS });
      this.multi = [...copy];

      this.Niteraccion ++;

    }
    this.Niteraccion --;
    this.datosEntrenamiento.Pesos = this.PesosEntrenamiento;
    this.iniciarEntrenamiento = true;
    this.iniciarSimulacion = false;
  }

  public calcularS(pesos, entradas){
    var s = 0;
      for (let index = 0; index < pesos.length; index++) {
        s +=  pesos[index] * entradas[index];  
          
      }

      return s  
  }

  public calcularYr(S, funcionA){
    var yr = 0;
    if (funcionA == "Escalon") {

      if (S > 0) {
        yr = 1;
      }
      else{
        yr = 0;
      }
    }
    else{
      yr = S;
    }
    return yr;
  }


  public simulacion(){

    this.Neurona = new Neurona();
    this.PesosEntrenamiento = this.datosEntrenamiento.Pesos;
    var ERMS = 1;
    var yr = 0;
    var el = 0;
    var ep = 0;
    var sumep;

    console.log("----------------ITERACCION DE SIMULACION-------------------------");
      sumep = 0;
      ERMS = 0;
      console.log("PESOS ACTUALES: "+ this.PesosEntrenamiento.join(","));
      for (let index = 0; index < this.Npatrones; index++) {
        this.Neurona = this.datosNeuronas[index];
        yr = this.calcularYr(this.calcularS(this.PesosEntrenamiento,this.Neurona.Entradas),this.datosEntrenamiento.FuncionActivacion)
        
        this.datosNeuronas[index].SalidasRed = yr;
        el = this.Neurona.Salidas[0] - yr
        ep = Math.abs(el)/this.Nsalidas;

        sumep += ep;
        
        console.log("ENTRADAS: "+ this.Neurona.Entradas.join(","));
        console.log("Salida Esperada: "+ this.Neurona.Salidas[0] + " Salida de la red: "+ yr);
        console.log("Error del Lineal: "+ el);
        
        for (let index = 0; index < this.Neurona.Entradas.length; index++) {


          this.PesosEntrenamiento[index] += this.datosEntrenamiento.RataAprendizaje * el * this.Neurona.Entradas[index];

        }
        

        
      }

      ERMS = sumep/this.Npatrones;
      console.log("Error Iteracion: "+ERMS);


      console.log(this.datosNeuronas);
      this.MostrarTabla = true;

      for (let index = 0; index < this.datosNeuronas.length; index++) {
        var a = index + 1;
        let copy = this.multi2;
        copy[0].series.push({ name: a.toString(), value: this.datosNeuronas[index].Salidas[0] });
        copy[1].series.push({ name: a.toString(), value: this.datosNeuronas[index].SalidasRed });
        this.multi2 = [...copy];
        
      }


  }



}


