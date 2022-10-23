
from flask import Flask, render_template, request, json, jsonify, redirect
import sqlite3

app = Flask(__name__)

#usuario
@app.route('/')
def registro():
  return render_template('registro.html')
  #registro  
@app.route('/registroAjax', methods=['GET', 'POST'])
def registroAjax():
  if request.method == 'POST':
      nombre = request.form['nombre']
      contraseña = request.form['contraseña']
      mail = request.form['mail']
      tipo = 'cliente'
    
      print(nombre)
      print(contraseña)
      print(mail)

      conn = sqlite3.connect('BD_RDS.db')
      q = f"""SELECT * FROM Usuario WHERE nombre = '{nombre}'"""
      resu = conn.execute(q)
      account = resu.fetchone()
   
  
      if account:
        print("Ya existe, volver a ingresar otro.")
        return render_template('registro.html', yaExiste = True)
      else: 
        q = f"""INSERT INTO Usuario (nombre, mail, contraseña, tipoUsuario)  VALUES ('{nombre}', '{mail}', '{contraseña}', '{tipo}')"""
        print(q)
        agregar = conn.execute(q)
        print(agregar)
        conn.commit()
        conn.close()
        return redirect ("/mapa") 
  else:
    return render_template('registro.html')
#https://codeshack.io/login-system-python-flask-mysql/

    
  #ingreso
@app.route('/login')
def ingreso():
  return render_template('login.html')
  
@app.route('/ingresoAjax', methods=['GET', 'POST'])
def ingresoAjax():
  if request.method == 'POST':
      nombre = request.form['nombre']
      contraseña = request.form['contraseña']
    
      
      print(nombre)
      print(contraseña)

    

      conn = sqlite3.connect('BD_RDS.db')

      """" SELECT nombre,
           contraseña,
           tipoUsuario = CASE
                               WHEN ListPrice = 0
                               THEN 'Not for resale'"""

    
      q = f"""SELECT nombre, contraseña, tipoUsuario FROM Usuario WHERE nombre = '{nombre}' and contraseña = '{contraseña}' """
      print(q)
      resu = conn.execute(q)
      account = resu.fetchone()
      resu = conn.execute(q)
  
      if account and account[2] == 'admin':
        return redirect ("/admin")  
      elif account and account[2] == 'cliente':
        return redirect ("/mapa")
      else:
        print("No existe, registrese")
        return render_template('login.html', yaExiste = True)

  else:
     return render_template('login.html')
  
# fin usuario
    
@app.route('/mapa')
def inicio():
  return render_template('demo.html')

    
# Administrador
@app.route('/admin')
def administrador():
  conn = sqlite3.connect('BD_RDS.db')
  q = """SELECT id_lugar, nombre FROM Lugar """
  respuesta = conn.execute(q)
  print(respuesta)
  lista = respuesta.fetchall()
  print(lista)
  return render_template('admin.html', lista = lista)
  

@app.route('/eliminarAjax',  methods=['DELETE'])
def eliminarAjax():
    if request.method == 'DELETE':
      variable = request.form['lugar']
      
      conn = sqlite3.connect('BD_RDS.db')
      
      q = f"""DELETE FROM Lugar WHERE nombre = '{variable}' """
      print(q)
      eliminar = conn.execute(q)
      conn.commit()
      conn.close()
      print(eliminar)
      return json.dumps(True)


@app.route('/modificarAjax',  methods=['PUT'])
def modificarAjax():
    if request.method == 'PUT':
      variable = request.form['lugar']
      nombre = request.form['nuevo']
      direccion = request.form['direccion']
      descripcion = request.form['descripcion']
      costo = request.form['costo']
      lat = request.form['lat']
      long = request.form['long']
      tipo = request.form['tipo']
      
      print(variable)
      print(nombre)
      print(direccion)
      print(descripcion)
      print(costo)
      conn = sqlite3.connect('BD_RDS.db')
      
      q = f"""UPDATE Lugar SET nombre ='{nombre}', direccion ='{direccion}', descripcion ='{descripcion}', costo = '{costo}', lat = '{lat}', long = '{long}', tipo = '{tipo}' WHERE nombre = '{variable}';"""
      
      print(q)
      modificar = conn.execute(q)
      conn.commit()
      conn.close()
      print(modificar)
      return json.dumps(True)

@app.route('/agregarAjax', methods=['POST'])
def ajaxAgregar():
  if request.method == 'POST':
      nombre = request.form['nombre']
      direccion = request.form['direccion']
      descripcion = request.form['descripcion']
      costo = request.form['costo']
      lat = request.form['lat']
      long = request.form['long']
      tipo = request.form['tipo']
      
      conn = sqlite3.connect('BD_RDS.db')

      print(nombre)
      print(direccion)
      print(descripcion)
      print(costo)
    
      q = f"""INSERT INTO Lugar (nombre, direccion, descripcion, costo) 
      VALUES ('{nombre}', '{direccion}', '{descripcion}', '{costo}', '{lat}', '{long}', '{tipo}')"""
      print(q)
      agregar = conn.execute(q)
      print(agregar)
      conn.commit()
      conn.close()
      return json.dumps(True)
  else:
      return redirect('admin.html')

@app.route('/traerLista', methods=['POST', 'GET'])
def traerLista():
  if request.method == "GET":
    conn = sqlite3.connect('BD_RDS.db')
    q = """SELECT * FROM Lugar """
    respuesta = conn.execute(q)

    results = {'lista': respuesta.fetchall()}
    print(results)
    return jsonify(results)
    
# Fin Admin




    
app.run(host='0.0.0.0', port=81)
