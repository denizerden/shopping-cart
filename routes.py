from __init__ import app
from flask import render_template, flash, redirect, url_for, request
from forms import ProductForm
from models import Product
from datetime import datetime
import json


@app.route('/', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
def hello_world():
    form = ProductForm()
    if form.validate_on_submit():
        # with switch_collection('products'):
        product = Product(title=form.title.data,
            description=form.description.data,
            price=form.price.data,
            image_file=form.image_file.data,
            created_on=datetime.utcnow()).save()
        print(product.id)
        # db.products.insert_one(product.to_mongo())
        flash(f'Product added', 'success')
        return redirect(url_for('test', product_id=product.id))
    return render_template('home.html', form=form)


@app.route('/product', methods=['GET', 'POST'])
def product(product_id):
    product_id = request.args.get('id')
    return render_template('product.html')


@app.route('/product/<product_id>', methods=['GET', 'POST'])
def test(product_id):
    product = None
    try:
        product = Product.objects.get(id=product_id)
    except:
        product = Product(title="Lipstick",
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint voluptatibus quasi magni voluptate eveniet minima aliquam natus consequatur error mollitia aliquid sit repudiandae quaerat illum quam tenetur, neque totam minus impedit? Minima asperiores perspiciatis nam eveniet. Quam iste repellat rem, adipisci eveniet nihil quas fuga, accusantium vel labore est quis qui ea quos deleniti magnam? Accusantium, ullam numquam nesciunt quam dolorum, ut illum repellendus odio molestias libero repudiandae commodi voluptatibus cumque harum explicabo possimus animi delectus assumenda, ab quisquam vel? At adipisci quidem dolorum laboriosam quasi, laborum iure, voluptates ullam provident culpa voluptatem quis quos possimus totam animi debitis deserunt nobis quae vero, illo amet",
            price=123,
            image_file="ex2.jpg",
            created_on=datetime.utcnow())
    if request.method == 'POST':
        product_id = request.values.get('id', '')
        product = Product.objects.get(id=product_id)
        # TODO: actually add the product to cart
        return product.to_json()
    return render_template('product.html', product=product)
