/* Administrador */
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
      
      alert(`Nueva Palabra ingresada: ${verificacion}`)
    },
    error: function(error){
      console.log(error);
    },
  });
}

function modificarAjax(){
  pregunta = document.getElementById("palabra").value
  nuevo = document.getElementById("nuevo").value
  $.ajax({
    url:"/modificarAjax",
    type:"PUT",
    data: {"palabra":pregunta, "nuevo":nuevo},
    success: function(response){
      console.log(response)
      verificacion = JSON.parse(response);
      
      alert(`Nueva Palabra ingresada: ${verificacion}`)
    },
    error: function(error){
      console.log(error);
    },
  });

function agregarAjax(){
  nombre = document.getElementById("nuevo").value
  direccion= document.getElementById("direccion").value
  descripcion= document.getElementById("descripcion").value
  costo= document.getElementById("costo").value
  
  $.ajax({
    url:"/agregarAjax",
    type:"POST",
    data: {"nombre":nombre, "direccion":direccion, "descripcion":descripcion, "costo":costo},
    
    success: function(response){
      console.log(response)
      verificacion = JSON.parse(response);
      
      alert(`Nueva Palabra ingresada: ${verificacion}`)
    },
    error: function(error){
      console.log(error);
    },
  });
}
/* Fin Administrador */