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
      console.log("Hola");

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

 

//document.getElementById('NOMBRE').innerHTML = frase;


/* https://dev.to/am20dipi/how-to-build-a-simple-search-bar-in-javascript-4onf#test */

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
 
    },
    error: function(error){
      console.log(error);
    },
  });
}



    /* traer info buscador*/
function underBar() {
  console.log("ACA")
  $.ajax({
   type: "GET",
   url: "/mapaAjax",
   data: {"value":null},

  success: 
    function(result) {
      lista = result; 
      console.log(lista)
      r = Math.floor(Math.random() * result.lista.length)
      console.log(r)
      nombre1 = result.lista[r][1]
      dire1 = result.lista[r][2]
      tipo1 = result.lista[r][7]
      precio1 = result.lista[r][4]
      
      console.log(dire1)
      console.log(nombre1)
      console.log(tipo1)
      console.log(precio1)
      
      document.getElementById('nombre1').innerHTML = nombre1;
      document.getElementById('direccion1').innerHTML = dire1;
      document.getElementById('tipo1').innerHTML = tipo1;
      document.getElementById('precio1').innerHTML = precio1;

      
      i = Math.floor(Math.random() * result.lista.length)
      for (; i == r ;) {
        i = Math.floor(Math.random() * result.lista.length); }
      console.log(i)
      
      nombre2 = result.lista[i][1]
      dire2 = result.lista[i][2]
      tipo2 = result.lista[i][7]
      precio2 = result.lista[i][4]
      
      console.log(dire2)
      console.log(nombre2)
      console.log(tipo2)
      console.log(precio2)
      
      document.getElementById('nombre2').innerHTML = nombre2;
      document.getElementById('direccion2').innerHTML = dire2;
      document.getElementById('tipo2').innerHTML = tipo2;
      document.getElementById('precio2').innerHTML = precio2;
      
    }, 
    
    error:
      function error(error) {
        console.log(error)
      }
   });
} 


    /* Guardar Imagenes */

function traerImg() {
  $.ajax({
   type: "GET",
   url: "/traerImagenes",
   data: {"value":null},

   success: 
    function(result) {
      lista = result; 
      console.log(lista)
      url = result.lista[0][1]
       
    }, 
    error:
      function error(error) {
        console.log(error)
      }
 }); 
  
}

/* FIN MAPA */