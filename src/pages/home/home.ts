import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  estado:string = "";
  resultados: Array<string> = [];
  resultado: string = "";
  permisos: string = "";
  disponible: string = "";
  supportLenguage: Array<string>| string = [];
  match: string = "";
  constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition) {

  }

  public escuchar(){
    this.estado = "escuchando";


    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      console.log(hasPermission);
      this.permisos = "Tiene permisos: " + (hasPermission ? "si" : "no");
      if (!hasPermission) {
        this.speechRecognition.requestPermission();
      }
    });

    // Check feature available
    this.speechRecognition.isRecognitionAvailable()
    .then((available: boolean) => {
      console.log(available);
      this.disponible = "Recognition disponible: "+ (available ? "si" : "no");
    });

    //lenguajes soportado
    this.speechRecognition.getSupportedLanguages()
    .then(
      (languages: Array<string>) => {
        this.supportLenguage = languages;
      },
      
      (error) => {
        this.supportLenguage = error;
      }
    )
    
    let options = {
      language: 'es-CO'
    }
    // Start the recognition process
    this.speechRecognition.startListening(options)  
    .subscribe(
      (matches: Array<string>) => {
        let respeto = "";
        let accion = "";
        let objeto = "";
        this.resultados = matches;

        for(let match in matches){
          this.match = match;
          //accion
          if(accion == ""){
            if(match.indexOf("reproducir")){
              accion = "reproducir";
            }
            else if(match.indexOf("reproduzca")){
              accion = "reproduzca";
            }
            else if(match.indexOf("inicie")){
              accion = "inicie";
            }
            else if(match.indexOf("play")){
              accion = "play";
            }
            else if(match.indexOf("iniciar")){
              accion = "iniciar";
            }
          }
  
          //objeto
          if(objeto == ""){
            if(match.indexOf("audio")){
              objeto = "audio";
            }
            else if(match.indexOf("sonido")){
              objeto = "sonido";
            }
            else if(match.indexOf("pista")){
              objeto = "pista";
            }
            else if(match.indexOf("capitulo")){
              objeto = "capitulo";
            }
          }
  
          //respeto
          if(respeto == ""){
            if(match.indexOf("por favor")){
              respeto = "por favor";
            }
            else if(match.indexOf("pleace")){
              respeto = "pleace";
            }
            else if(match.indexOf("favor")){
              respeto = "favor";
            }
          }
        }
        
        if(accion == ""){
          this.resultado = "Que desea hacer";
        }
        else if(objeto == ""){
          this.resultado = "No es claro que desea escuchar";
        }
        else if(respeto == ""){
          this.resultado = "Sea una persona respetuosa";
        }
        else{
          this.resultado = accion + " - " + objeto + " - " + respeto;
        }
      },
      (onerror) => {
        this.resultado = onerror;
      }
    );

    function validatematches(matches: Array<string>){
      let respeto = "";
      let accion = "";
      let objeto = "";
      this.resultados = matches;

      for(let match in matches){
        
        //accion
        if(accion == ""){
          if(match.indexOf("reproducir")){
            accion = "reproducir";
          }
          else if(match.indexOf("reproduzca")){
            accion = "reproduzca";
          }
          else if(match.indexOf("inicie")){
            accion = "inicie";
          }
          else if(match.indexOf("play")){
            accion = "play";
          }
          else if(match.indexOf("iniciar")){
            accion = "iniciar";
          }
          else{
            accion = "";
          }
        }

        //objeto
        if(objeto == ""){
          if(match.indexOf("audio")){
            objeto = "audio";
          }
          else if(match.indexOf("sonido")){
            objeto = "sonido";
          }
          else if(match.indexOf("pista")){
            objeto = "pista";
          }
          else if(match.indexOf("capitulo")){
            objeto = "capitulo";
          }
          else{
            objeto = "";
          }
        }

        //respeto
        if(respeto == ""){
          if(match.indexOf("por favor")){
            respeto = "por favor";
          }
          else if(match.indexOf("pleace")){
            respeto = "pleace";
          }
          else if(match.indexOf("favor")){
            respeto = "favor";
          }
          else{
            respeto = "";
          }
        }
      }
      
      if(accion == ""){
        this.resultado = "Que desea hacer";
      }
      else if(objeto == ""){
        this.resultado = "No es claro que desea escuchar";
      }
      else if(respeto == ""){
        this.resultado = "Sea una persona respetuosa";
      }
      else{
        this.resultado = accion + " - " + objeto + " - " + respeto;
      }
    }
  }

  

}
