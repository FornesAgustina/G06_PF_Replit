/* ADMINISTRADOR */
/* Eliminar Lugar */
function eliminarAjax(){
  lugar = document.getElementById("selectEliminar").value
  console.log(lugar)
  $.ajax({
    url:"/eliminarAjax",
    type:"DELETE",
    data: {"lugar":lugar},
    success: function(response){
      console.log(response)
      verificacion = JSON.parse(response);
      opciones = document.getElementById("selectEliminar").options
      html = ""
      for (let i = 0; i < opciones.length; i++) {
        /*console.log(opciones[i].value)*/
        if (lugar != opciones[i].value) {
          html += opciones[i].outerHTML
          console.log(html);
          console.log(i);
        }
      }
      console.log(html);
      document.getElementById("lugar").innerHTML=html
      document.getElementById("selectEliminar").innerHTML=html
      document.getElementById("img").innerHTML=html
    },
    
    error: function(error){
      console.log(error);
    },
  });
}

/* Eliminar Imagenes */
function eliminar(){
  imagen = document.getElementById("eliminarImg").value
  console.log(imagen)
  $.ajax({
    url:"/eliminar",
    type:"DELETE",
    data: {"img":imagen},
    success: function(response){
      console.log(response)
      verificacion = JSON.parse(response);
      opciones = document.getElementById("eliminarImg").options
      html = ""
      for (let i = 0; i < opciones.length; i++) {
        /*console.log(opciones[i].value)*/
        if (img != opciones[i].value) {
          html += opciones[i].outerHTML
          console.log(html);
          console.log(i);
        }
      }
      console.log(html);
     
      document.getElementById("eliminarImg").innerHTML=html
     
    },
    
    error: function(error){
      console.log(error);
    },
  });
}


/* Eliminar Opiniones 
function eliminarOp(){
  $.ajax({
    url:"/eliminarOPAjax",
    type:"DELETE",
    data: {"value":null},
    success: function(response){
      console.log(response)
    },
    
    error: function(error){
      console.log(error);
    },
  });
}*/

/* Modificar Lugar */
function modificarAjax(){
  lugar = document.getElementById("lugar").value
  nuevo = document.getElementById("nuevo").value
  direccion= document.getElementById("direccionMod").value
  descripcion= document.getElementById("descripcion").value
  costo= document.getElementById("costoMod").value
  lat = document.getElementById("coordLat").value
  long = document.getElementById("coordLong").value
  tipo = document.getElementById("tipoMod").value
  insta = document.getElementById("instaMod").value
  $.ajax({
    url:"/modificarAjax",
    type:"PUT",
    data: {"lugar":lugar, "nuevo":nuevo, "direccion":direccion, "descripcion":descripcion, "costo":costo, "lat":lat, "long":long, "tipo":tipo, "insta":insta},
    
    success: function(response){
      console.log(response)
      verificacion = JSON.parse(response);
      
      alert(`Lugar modificado: ${verificacion}`)
      
    },
    error: function(error){
      console.log(error);
    },
  });
}
/* Agregar lugar*/
function agregarAjax(){
  nombre = document.getElementById("nombreAgregar").value;
  direccion = document.getElementById("direccionAgregar").value;
  descripcion = document.getElementById("descripcionAgregar").value;
  costo = document.getElementById("costoAgregar").value;
  lat = document.getElementById("latAgregar").value;
  long = document.getElementById("longAgregar").value;
  tipo = document.getElementById("tipoAgregar").value;
  insta = document.getElementById("instaAgregar").value;
  
  $.ajax({
    url:"/agregarAjax",
    type:"POST",
    data: {"nombre":nombre, "direccion":direccion, "descripcion":descripcion, "costo":costo, "lat":lat, "long":long, "tipo":tipo, "insta":insta},
    
    success: function(response){
      console.log(response)
      verificacion = JSON.parse(response);
      
      alert(`Nuevo lugar ingresado: ${verificacion}`)
      
        document.getElementById("lugar").innerHTML=document.getElementById("lugar").innerHTML+'<option value="'+nombre+'">' + nombre + '</option>';
      

document.getElementById("selectEliminar").innerHTML=document.getElementById("selectEliminar").innerHTML+'<option value="'+nombre+'">' + nombre + '</option>';

      document.getElementById("img").innerHTML=document.getElementById("img").innerHTML+'<option value="'+nombre+'">' + nombre + '</option>';
    },
    error: function(error){
      console.log(error);
    },
  });
}

/* Traer lugares */
function mandarAjax() {
   $.ajax({
   type: "GET",
   url: "/traerLista",
   data: {"value":null},

   success: 
    function(result) {
      lista = result; 
      console.log(lista)
    }, 
    error:
      function error(error) {
        console.log(error)
      }
 }); 
}

                                      /* FIN ADMIN */


 
                                      /* MAPA */
  /* buscador*/
function buscar() {
  input =document.getElementById("SearchBar").value  
  console.log(input);
  $.ajax({
    url:"/buscador",
    type:"POST",
    data: {"input":input},
    
    success: function(result){
      lista = result;
      console.log(result) 
      if (input == ""){
        underBar() }
      else{
        //div 1
        nombre1 = result.lista[0][1]
        dire1 = result.lista[0][2]
        tipo1 = result.lista[0][7]
        precio1 = result.lista[0][4]
        for(t=0;t<result.imagenes.length;t++){
          if (result.imagenes[t][2]==result.lista[0][0]){
            foto1 = result.imagenes[t][1] 
          }
        }

        document.getElementById('img1').src = './static/img/'+foto1;  
        document.getElementById('nombre1').innerHTML = nombre1;
        document.getElementById('input1').value = result.lista[0][0];
        document.getElementById('direccion1').innerHTML = dire1;
        document.getElementById('tipo1').innerHTML = tipo1;
        document.getElementById('precio1').innerHTML = precio1;

        //div 2
        nombre2 = result.lista[1][1]
        dire2 = result.lista[1][2]
        tipo2 = result.lista[1][7]
        precio2 = result.lista[1][4]
        
        for(a=0;a<result.imagenes.length;a++){
          if (result.imagenes[a][2]==result.lista[1][0]){
            foto2 = result.imagenes[a][1]
          }
        }

        document.getElementById('img2').src = './static/img/'+ foto2; 
        document.getElementById('nombre2').innerHTML = nombre2;
        document.getElementById('input2').value = result.lista[1][0];
        document.getElementById('direccion2').innerHTML = dire2;
        document.getElementById('tipo2').innerHTML = tipo2;
        document.getElementById('precio2').innerHTML = precio2;

        //div 3
        nombre3 = result.lista[2][1]
        dire3 = result.lista[2][2]
        tipo3 = result.lista[2][7]
        precio3 = result.lista[2][4]
        for(q=0;q<result.imagenes.length;q++){
          if (result.imagenes[q][2]==result.lista[2][0]){
            foto3 = result.imagenes[q][1]
          }
        }
        console.log(nombre3)
        document.getElementById('img3').src = './static/img/'+foto3; 
        document.getElementById('nombre3').innerHTML = nombre3;
        document.getElementById('input3').value = result.lista[2][0];
        document.getElementById('direccion3').innerHTML = dire3;
        document.getElementById('tipo3').innerHTML = tipo3;
        document.getElementById('precio3').innerHTML = precio3;
      }    
    },
    error: function(error){
      console.log(error);
    },
  });
}



  /* traer info buscador*/
function underBar() {
  $.ajax({
   type: "GET",
   url: "/mapaAjax",
   data: {"value":null},

  success: 
    function(result) {
      
      console.log(result)
      r = Math.floor(Math.random() * result.lista.length)
      //console.log(r)
      
      nombre1 = result.lista[r][1]
      dire1 = result.lista[r][2]
      tipo1 = result.lista[r][7]
      precio1 = result.lista[r][4]
      for(t=0;t<result.imagenes.length;t++){
        if (result.imagenes[t][2]==result.lista[r][0]){
          foto1 = result.imagenes[t][1] 
        }
      }
    
      //console.log(foto1)
      //console.log(dire1)
      //console.log(nombre1)
      //console.log(tipo1)
      //console.log(precio1)
      
      document.getElementById('img1').src = './static/img/'+foto1;  
      document.getElementById('nombre1').innerHTML = nombre1;
      document.getElementById('input1').value = result.lista[r][0];
      document.getElementById('direccion1').innerHTML = dire1;
      document.getElementById('tipo1').innerHTML = tipo1;
      document.getElementById('precio1').innerHTML = precio1;

      

      let i = Math.floor(Math.random() * result.lista.length)
      for (; i == r;) {
        i = Math.floor(Math.random() * result.lista.length); }
      //console.log(i)
      nombre2 = result.lista[i][1]
      dire2 = result.lista[i][2]
      tipo2 = result.lista[i][7]
      precio2 = result.lista[i][4]
      
      for(a=0;a<result.imagenes.length;a++){
        if (result.imagenes[a][2]==result.lista[i][0]){
          //console.log(result.imagenes[a][1])
          foto2 = result.imagenes[a][1]
        }
      }
   
      //console.log(dire2)
      //console.log(nombre2)
      //console.log(tipo2)
      //console.log(precio2)
      
      document.getElementById('img2').src = './static/img/'+ foto2; 
      document.getElementById('nombre2').innerHTML = nombre2;
      document.getElementById('input2').value = result.lista[i][0];
      document.getElementById('direccion2').innerHTML = dire2;
      document.getElementById('tipo2').innerHTML = tipo2;
      document.getElementById('precio2').innerHTML = precio2;



      e = Math.floor(Math.random() * result.lista.length)
      for (; e == r || e == i ;) {
        e = Math.floor(Math.random() * result.lista.length); }
      //console.log(i)

      
      nombre3 = result.lista[e][1]
      dire3 = result.lista[e][2]
      tipo3 = result.lista[e][7]
      precio3 = result.lista[e][4]
      for(q=0;q<result.imagenes.length;q++){
        if (result.imagenes[q][2]==result.lista[e][0]){
          foto3 = result.imagenes[q][1]
        }
      }
   
      //console.log(dire3)
      //console.log(nombre3)
      //console.log(tipo3)
      //console.log(precio3)
      
      document.getElementById('img3').src = './static/img/'+foto3; 
      document.getElementById('nombre3').innerHTML = nombre3;
      document.getElementById('input3').value = result.lista[e][0];
      document.getElementById('direccion3').innerHTML = dire3;
      document.getElementById('tipo3').innerHTML = tipo3;
      document.getElementById('precio3').innerHTML = precio3;
    }, 
    
    error:
      function error(error) {
        console.log(error)
      }
   });
} 


/*Guardar Imagenes*/ 
function traerImg() {
  $.ajax({
   type: "GET",
   url: "/traerImagenes",
   data: {"value":null},

   success: 
    function(result) {
      lista = result; 
      console.log(lista)
      
    }, 
    error:
      function error(error) {
        console.log(error)
      }
 });  
}

// coordenadas
function traerCoordenadas() {
   $.ajax({
   type: "POST",
   url: "/traerCoordenadas",

   success:  
    function(result) {
      console.log(result)
      for(let i = 0; i < result.coordenadas.length; i++) {
        map.addMarker({lat: result.coordenadas[i][0], lng: result.coordenadas[i][1]},true, false, false, true, true, {},'<b>'+ result.coordenadas[i][3]+'</b> <form id="formu" action="/descripcion" method="POST"><input type="hidden" name="lugar" value="'+result.coordenadas[i][2]+'"><button type="submit" name="submit_param" value="submit_value" class="link-button">ver más</button></form>');

      }
    }, 
    error:
      function error(error) {
        console.log(error)
      }
 }); 
}
// fin coordenadas
/* FIN MAPA */



/* DESCRIPCION */
//trae info a descripcion
function descripcionAjax() {
   $.ajax({
   type: "POST",
   url: "/descripcion",
   data: {"lugar":null},

   success: 
    function(result) { 
      console.log(result)
      
    }, 
    error:
      function error(error) {
        console.log(error)
      }
 }); 
}
//carga opiniones
function opinionAjax() {
  opinion = document.getElementById("opinion").value;
  estrellas = document.getElementById("estrellas").value;
   $.ajax({
   type: "PUT",
   url: "/opinionAjax",
   data: {"opinion":opinion, "estrellas":estrellas},

   success: 
    function(result) { 
      console.log(result)
      
    }, 
    error:
      function error(error) {
        console.log(error)
      }
 }); 
}


//muestra opiniones
function mostrarOp() {
   $.ajax({
   type: "GET",
   url: "/mostrarOpiniones",
   data: {},

   success: 
    function(result) {
      for (let i =0; i < result.lista.length; i++){
        usuario = result.lista[i][0]
        opinion = result.lista[i][1]
        document.getElementById("popup").innerHTML =  document.getElementById("popup").innerHTML + '<h5 value="'+result.lista[i]+'" name="usuario" id="usuario'+i+'">'+usuario+': </h5>';

        //console.log('"usuario'+i+'"');
        
        document.getElementById("popup").innerHTML = document.getElementById("popup").innerHTML + '<p value="'+result.lista[i]+'"  name="opinion" id="opinion'+i+'">'+opinion+'</p>';
      }  
    },     
  error:
    function error(error) {
      console.log(error)
    }  
  });
}

var btnAbrirPopup = document.getElementById('abrir'),
	overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');

  btnAbrirPopup.addEventListener('click', function(){
	  overlay.classList.add('active');
  	popup.classList.add('active');
  });     
function cerraroPopUp(params) {
  
  $.ajax({
   type: "GET",
   url: "/mostrarOpiniones",
   data: {},

   success: 
    function(result) {
      for (let i =0; i < result.lista.length; i++){
        usuario = result.lista[i][0]
        opinion = result.lista[i][1]
        
        //const userEliminado = document.getElementsByName("usuario");
        var ele= document.getElementsByName("usuario");
        for(let i=0;i<ele.length;i++)
        {
          ele[i].parentNode.removeChild(ele[i]);
        }
        var opi= document.getElementsByName("opinion");
        for(let i=0;i<opi.length;i++)
        {
          opi[i].parentNode.removeChild(opi[i]);
        }

        //console.log(userEliminado)
        //='<h5 value="'+result.lista[i]+'" id="usuario'+i+'">'+usuario+'</h5>';

        //const opinionEliminado = document.getElementsByName("opinion");//'<p value="'+result.lista[i]+'" id="opinion'+i+'">'+opinion+'</p>';
        //userEliminado.remove();
        //opinionEliminado.remove();
      }  
    },     
  error:
    function error(error) {
      console.log(error)
    }  
  });

  popup = document.getElementById('popup')
  overlay = document.getElementById('overlay')
  overlay.classList.remove('active');
  popup.classList.remove('active');
}
/* FIN DESC 

 <h5 value="" id="usuario">{{ lista[i][0] }}</h5>
      <p value="" id="opinion">{{ lista[i][1] }}</p>*/


/*valueUser = document.getElementById("usuario{{i}}").value 
        valueOpinion =  document.getElementById("usuario{{i}}").value
        if(valueUser = usuario && valueOpinion=opinion){
          
        }*/
        //console.log(opinion)  <p value="'+opinion+'id="opinion'+i+'">'+opinion+'</p>'
      //console.log(result.lista)