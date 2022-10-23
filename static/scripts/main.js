/* Administrador */
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
          console.log(opciones[i].value)
          if (lugar != opciones[i].value) {
            html += opciones[i].outerHTML
          }
      }
      console.log(html)
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
  direccion= document.getElementById("direccion").value
  descripcion= document.getElementById("descripcion").value
  costo= document.getElementById("costo").value
  lat = document.getElementById("lat").value
  long = document.getElementById("long").value
  tipo = document.getElementById("tipo").value
  
  $.ajax({
    url:"/modificarAjax",
    type:"PUT",
    data: {"lugar":lugar, "nuevo":nuevo, "direccion":direccion, "descripcion":descripcion, "costo":costo, "lat":lat, "long":long, "tipo":tipo},
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
/* Agregar lugar */
function agregarAjax(){
  nombre = document.getElementById("nombre").value
  direccion= document.getElementById("direccion").value
  descripcion= document.getElementById("descripcion").value
  costo= document.getElementById("costo").value
  lat = document.getElementById("lat").value
  long = document.getElementById("long").value
  tipo = document.getElementById("tipo").value

  
  $.ajax({
    url:"/agregarAjax",
    type:"POST",
    data: {"nombre":nombre, "direccion":direccion, "descripcion":descripcion, "costo":costo, "lat":lat, "long":long, "tipo":tipo},
    
    success: function(response){
      console.log(response)
      verificacion = JSON.parse(response);
      
      alert(`Nueva lugar ingresado: ${verificacion}`)
      
        document.getElementById("lugar").innerHTML=document.getElementById("lugar").innerHTML+'<option value="'+nombre+'">' + nombre + '</option>';
      console.log("Hola BB");
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
/* fin admin */
/* ingreso usuario 
function registroAjax(){
  nombre = document.getElementById("name").value
  mail= document.getElementById("mail").value
  contraseña = document.getElementById("password").value
  
  $.ajax({
    url:"/registroAjax",
    type:"POST",
    data: {"nombre":nombre, "mail":mail, "contraseña":contraseña},
    
    success: function(response){
      console.log(response)
      verificacion = JSON.parse(response);
      
      alert(`Nuevo usuario ingresado: ${verificacion}`)

      
    },
    error: function(error){
      console.log(error);
    },
  });

  
}
*/
/*- tipo de usuario
        - que no se repitan
        - ingreso
         - obligatorio*/