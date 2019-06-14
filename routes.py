from __init__ import app, db
from flask import render_template
from forms import ProductForm
from models import Product


@app.route('/')
@app.route('/home')
def hello_world():
    form = ProductForm()
    if form.validate_on_submit():
        product = Product(title=form.title.data,
                          description=form.description.data)
        db.products.insert_one(product)
    return render_template('home.html', form=form)


@app.route('/product/<product_id>')
def test(product_id):
    return render_template('product.html', product_id=product_id)
