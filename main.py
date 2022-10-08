from flask import Flask, render_template  #, request, redirect
#import sqlite3

app = Flask(__name__)


@app.route('/')
def registro():
  return render_template('registro.html')


@app.route('/login')
def ingreso():
  return render_template('login.html')


app.run(host='0.0.0.0', port=81)
