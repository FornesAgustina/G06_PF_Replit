from flask import Flask, render_template, request, json, jsonify #, redirect
import sqlite3

app = Flask(__name__)


@app.route('/')
def registro():
  return render_template('registro.html')

@app.route('/login')
def ingreso():
  return render_template('login.html')

@app.route('/mapa', methods=['POST'])
def inicio():
  if request.method  == 'POST':
    return render_template('mapa.html')

# Administrador
@app.route('/admin')
def administrador():
  return render_template('admin.html')

@app.route('/eliminar')
def eliminar():
    conn = sqlite3.connect('BD_RDS.db')
    q = """SELECT id_lugar, palabra FROM Lugar """
    respuesta = conn.execute(q)

    lista= respuesta.fetchall()
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

@app.route('/modificar')
def modificar():
    conn = sqlite3.connect('BD_RDS.db')
    q = """SELECT id_lugar FROM Lugar"""
    respuesta = conn.execute(q)

    lista= respuesta.fetchall()
    return render_template('admin.html', lista = lista)

@app.route('/modificarAjax',  methods=['PUT'])
def modificarAjax():
    if request.method == 'PUT':
      variable = request.form['lugar']
      nombre = request.form['nuevo']
      direccion = request.form['direccion']
      descripcion = request.form['descripcion']
      costo = request.form['costo']

      
      print(variable)
      print(nombre)
      conn = sqlite3.connect('BD_RDS.db')
      
      q = f"""UPDATE Lugar SET nombre ='{nombre}', direccion ='{direccion}', descripcion ='{descripcion}', costo = '{costo}' WHERE nombre = '{variable}';"""
      
      print(q)
      modificar = conn.execute(q)
      conn.commit()
      conn.close()
      print(modificar)
      return json.dumps(True)

@app.route('/agregar')
def agregar():
  return render_template('admin.html')

@app.route('/agregarAjax', methods=['POST'])
def ajaxAgregar():
  if request.method == 'POST':
      nombre = request.form['nombre']
      direccion = request.form['direccion']
      descripcion = request.form['descripcion']
      costo = request.form['costo']
      conn = sqlite3.connect('BD_RDS.db')
      
      q = f"""INSERT INTO Lugar (nombre, direccion, descripcion, costo) 
      VALUES ('{nombre}', '{direccion}, '{descripcion}', '{costo})"""
      print(q)
      agregar = conn.execute(q)
      print(agregar)
      conn.commit()
      conn.close()
      return jsonify(True)
  else:
      return render_template('agregar.html')
# Fin Admin

app.run(host='0.0.0.0', port=81)
