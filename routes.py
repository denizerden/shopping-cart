from __init__ import app, db
from flask import render_template, flash, redirect, url_for
from forms import ProductForm
from models import Product
from datetime import datetime


@app.route('/')
@app.route('/home', methods=['GET', 'POST'])
def hello_world():
    form = ProductForm()
    if form.validate_on_submit():
        product = Product(title=form.title.data,
                          description=form.description.data,
                          price=form.price.data,
                          created_on=datetime.utcnow())
        db.products.insert_one(product.to_mongo())
        flash(f'Product added', 'success')
        return redirect(url_for('hello_world'))
    return render_template('home.html', form=form)


@app.route('/product/<product_id>')
def test(product_id):
    return render_template('product.html', product_id=product_id)
