from __init__ import app
from flask import render_template


@app.route('/')
@app.route('/home')
def hello_world():
    return render_template('home.html')


@app.route('/test/<var>')
def test(var):
    return render_template('test.html', var=var)