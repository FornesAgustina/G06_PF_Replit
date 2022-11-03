  
from flask import Flask, render_template, request, json, jsonify, redirect
import random
import sqlite3, os
from os.path import abspath, dirname, join
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './static/img'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
path = './static'
path2 = 'img'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'contraseña2000'

#IMAGENES EN HTML y Traer DATOS
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
    
      q = f"""SELECT nombre, contraseña, tipoUsuario FROM Usuario WHERE nombre = '{nombre}' and contraseña = '{contraseña}' """
      print(q)
      resu = conn.execute(q)
      account = resu.fetchone()
      
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
    

# DESCRIPCION 
@app.route('/descripcion')
def descripcion():
  return render_template('descripcion.html')
# FIN DESCRIPCION
    
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
      insta = request.form['insta']
      
      print(variable)
      print(nombre)
      print(direccion)
      print(descripcion)
      print(costo)
      conn = sqlite3.connect('BD_RDS.db')
      
      q = f"""UPDATE Lugar SET nombre ='{nombre}', direccion ='{direccion}', descripcion ='{descripcion}', costo = '{costo}', coord_LAT = '{lat}', coord_LNG = '{long}', tipoLugar = '{tipo}', instagram = '{insta}' WHERE nombre = '{variable}';"""
      
      print(q)
      modificar = conn.execute(q)
      conn.commit()
      conn.close()
      print(modificar)
      return json.dumps(True)

@app.route('/agregarAjax', methods=['POST', 'GET'])
def agregarAjax():
  
  if request.method == 'POST':
      
      nombre = request.form['nombre']
      direccion = request.form['direccion']
      descripcion = request.form['descripcion']
      costo = request.form['costo']
      lat = request.form['lat']
      long = request.form['long']
      tipo = request.form['tipo']
      insta = request.form['insta']
      print("HOLIS")
      conn = sqlite3.connect('BD_RDS.db')

      print(nombre)
      print(direccion)
      print(descripcion)
      print(costo)
    
      q = f"""INSERT INTO Lugar (nombre, direccion, descripcion, costo, coord_LAT, coord_LNG, tipoLugar, instagram) 
      VALUES ('{nombre}', '{direccion}', '{descripcion}', '{costo}', '{lat}', '{long}', '{tipo}', '{insta}')"""
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

    
# IMAGENES
@app.route('/imagenes', methods=['POST'])
def imagenes():
  if request.method == 'POST':
      lugar = request.form['lugar']
      img = request.files['subir']
    
      print(lugar)
      print(img)
     

      filename = secure_filename(img.filename)
      file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
      print(file_path)
      img.save(file_path)
      print("hola")    
    
   
      conn = sqlite3.connect('BD_RDS.db')
      q = f"""SELECT id_lugar FROM Lugar WHERE nombre = '{lugar}'"""
      print(q)
      i = conn.execute(q)
      id = i.fetchone()
      print(id)
     
      q = """INSERT INTO Imagenes (url_img, id_lugar) 
      VALUES ('{filename}', '{id[0]')"""
      print(q)
      agregar = conn.execute(q)
      print(agregar)
      conn.commit()
      conn.close()
      return render_template('admin.html')
  else:
      return redirect('admin.html')
# Fin Admin    


# MAPA  
@app.route('/mapa')
def inicio():
  return render_template('demo.html')
   # trae imagenes
@app.route('/traerImagenes', methods=['POST', 'GET'])
def traerImagenes():
  if request.method == "GET":
    conn = sqlite3.connect('BD_RDS.db')
  
    q = """SELECT * FROM Imagenes"""
    respuesta = conn.execute(q)

    results = {'lista': respuesta.fetchall()}
    print(results)
    return jsonify(results)
  else:
    return render_template('demo.html')

    #trae info
@app.route('/mapaAjax', methods = ["GET","POST"])
def tabla():
  
  if request.method == "GET":
    conn = sqlite3.connect('BD_RDS.db')

    q = """SELECT * FROM Lugar """
    respuesta = conn.execute(q)

    results = {'lista': respuesta.fetchall()}
    print(results)
    return jsonify(results)
  else:
    return render_template('demo.html')
      
  # BUSCADOR
@app.route('/buscador', methods = ["POST"])
def buscador():
  if request.method == 'POST':
    input = request.form["input"]
    conn = sqlite3.connect('BD_RDS.db')
    q = f"""SELECT * FROM Lugar WHERE nombre like '{input}%' """
    respuesta = conn.execute(q)

    results = {'lista': respuesta.fetchall()}
    print(results)
    return jsonify(results)
  else:
    return render_template('mapa.html')

  # Fin buscador  


# FIN MAPA





app.run(host='0.0.0.0', port=81)


