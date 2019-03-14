var propForm = {

    entradas: document.querySelectorAll("input.validar"),
    valor: null,
    expresionRegular:null,
    validaciones: new Array() 
}

var validaCam = {
   
    valText:function(min,max,propVal,inpVal,menError,expresionRegular ){
       
   
       if(propVal.length < min || propVal.length > max || !expresionRegular.test(propVal) ){
           inpVal.innerHTML = '<span style="color:red">*Error al ingresar los datos: '+menError+'</span>';
           return false;

       }else{
           inpVal.parentNode.removeChild(inpVal);

          return true;

       }
      
    },

    valExpRegular:function(expresionRegular,propFormVal,inpVal,menError){
        
       if(!expresionRegular.test(propFormVal)){
           inpVal.innerHTML = '<span style="color:red">*Error al ingresar los datos: '+menError+'</span>';

           return  false;

       }else{

           inpVal.parentNode.removeChild(inpVal);

           return  true;
       }

    }
}

var registro = {
    comienzoRegister: function(){
    
         
        for(var i = 0; i < propForm.entradas.length; i++){
 
            propForm.entradas[i].addEventListener("focus", registro.inpFoco);
            propForm.entradas[i].addEventListener("blur", registro.inpFueraFoco);  
            propForm.entradas[i].addEventListener("change", registro.changeInput); 
            
        }   
 
    },
   
    inpFoco: function(input){
     
        propForm.valor = input.target.value;
        
       if(propForm.valor == ""){
 
             document.querySelector("[for="+input.target.id+"] .obligatorio").style.display = 'block'
        }
 
        document.querySelector("[for="+input.target.id+"]").appendChild(document.createElement("DIV")).setAttribute("class","error")
        
    },
    
 
    inpFueraFoco: function(input){

        document.querySelector("[for="+input.target.id+"] .obligatorio").style.display = 'none';
    },

    changeInput: function(input){
     let validar= false;
     propForm.valor = input.target.value;
     var valid = input.target.type;
     
     switch(valid)
     {      
             case "email":
                 if(propForm.valor != " ")
                     {
                         propForm.expresionRegular = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                         validar = validaCam.valExpRegular(propForm.expresionRegular,propForm.valor,document.querySelector("[for="+input.target.id+"] .error"),input.target.placeholder)
                         propForm.validaciones["email"] = validar;
                     }
                 else{
                         document.querySelector("[for="+input.target.id+"] .error").parentNode.removeChild(document.querySelector("[for="+input.target.id+"] .error"))
                     }
             break;
             
             case "password":
             
             if(propForm.valor != " ")
                     {
                         propForm.expresionRegular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
                         validar = validaCam.valExpRegular(propForm.expresionRegular,propForm.valor,document.querySelector("[for="+input.target.id+"] .error"),input.target.placeholder)
                         propForm.validaciones["password"] = validar;
                     }
             else{
                         document.querySelector("[for="+input.target.id+"] .error").parentNode.removeChild(document.querySelector("[for="+input.target.id+"] .error"))
                     }
             
             break;

             case "date":
            if(propForm.valor != "")
            {
               var fecha = new Date(propForm.valor);
               if(fecha)
               {
                   var y = fecha.getUTCFullYear();
                   var m = fecha.getUTCMonth()+1;
                   var d = fecha.getUTCDate();
                   var diaActual = new Date().getUTCDate();
                   var resultado =   m >= 0 && m < 12 && y > 1900 && y < 32768 && d > 0 && d <= diaActual ;
                   propForm.validaciones["fechaIng"] = resultado;
                   if(resultado){
                    document.querySelector("[for="+input.target.id+"] .error").parentNode.removeChild(document.querySelector("[for="+input.target.id+"] .error"))
                   }
                   else{
                    document.querySelector("[for="+input.target.id+"] .error").innerHTML = '<span style="color:red">*Error al ingresar los datos: La fecha no puede ser superior a la actual </span>';
                   }
               }
               
            }
            
            else{
                document.querySelector("[for="+input.target.id+"] .error").innerHTML = '<span style="color:red">*Error al ingresar los datos: El formato correcto es dd/mm/yyyy </span>';
                propForm.validaciones["fechaIng"] = false;

            }
     }
   }     
 }
 registro.comienzoRegister();  


//  (function() {
//      var register=document.getElementsByName("register")[0];
//      elementos= register.elements;
//      boton=document.getElementById("btn");

//      var validaInteres = function (e) {
//         if (formulario.sexo.checked == true || formulario.sexo[1].checked == true) {
            
//         } else {
//             alert("Tienes que rellenar algun campo");
//             e.preventDefault();
//         }
//      }

    

//  var validatodo = function(e){
//      validaInteres(e);
//  };

//  formulario.addEventListener("submit",validatodo);

// });