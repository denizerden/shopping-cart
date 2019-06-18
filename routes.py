from __init__ import app
from flask import render_template, flash, redirect, url_for, request
from flask_login import login_user, current_user, logout_user, login_required
from forms import ProductForm, LoginForm, RegisterForm
from models import Product, User, CartItem
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import json
import os


@app.route('/')
@app.route('/home')
@login_required
def home():
    return render_template('home.html', products=reversed(Product.objects()))


@app.route('/newproduct', methods=['GET', 'POST'])
@login_required
def new_product():
    form = ProductForm()
    if form.validate_on_submit():
        product = Product(title=form.title.data,
                          description=form.description.data,
                          price=form.price.data,
                          image_file=form.image_file.data,
                          created_on=datetime.utcnow()).save()
        print(product.id)
        flash(f'Product added', 'success')
        return redirect(url_for('product', id=product.id))
    return render_template('newproduct.html', form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        user = None
        try:
            user = User.objects.get(username=form.username.data)
        except:
            pass
        print(user)
        if user is not None:
            flash('That email is already registered.', 'danger')
            return redirect(url_for('register'))

        user = None
        try:
            user = User.objects.get(email=form.email.data)
        except:
            pass
        print(user)
        if user is not None:
            flash('That username already exists. Please use a different one.', 'danger')
            return redirect(url_for('register'))
        user = User(username=form.username.data, email=form.email.data,
                    password=generate_password_hash(form.password.data),
                    profile_picture='default.jpg', cart=[]).save()
        print(user.id)
        flash(f'User {user.username} successfully registered', 'success')
        return redirect(url_for('home'))
    return render_template('register.html', title='Register', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.objects.get(email=form.email.data)
        if user and check_password_hash(user.password, form.password.data):
            login_user(user)
            next_page = request.args.get('next')
            flash(f'Welcome, {user.username}', 'success')
            return redirect(next_page or url_for('home'))
        else:
            flash('Login failed. Please check email and password', 'danger')
    return render_template('login.html', title='Login', form=form)


@app.route('/logout')
def logout():
    logout_user()
    flash('You have been succesfully logged out', 'info')
    return redirect(url_for('home'))


@app.route('/product', methods=['GET', 'POST'])
def product():
    product_id = request.args.get('id')
    product = None
    try:
        product = Product.objects.get(id=product_id)
    except:
        product = Product(title="Dummy",
                          description='''Lorem ipsum dolor sit amet consectetur
                           adipisicing elit. Iusto sint voluptatibus quasi
                           magni voluptate eveniet minima aliquam natus
                           consequatur error mollitia aliquid sit repudiandae
                           quaerat illum quam tenetur, neque totam minus
                           impedit? Minima asperiores perspiciatis nam
                           eveniet. Quam iste repellat rem, adipisci eveniet
                           nihil quas fuga, accusantium vel labore est quis
                           qui ea quos deleniti magnam? Accusantium, ullam
                           numquam nesciunt quam dolorum, ut illum repellendus
                           odio molestias libero repudiandae commodi
                           voluptatibus cumque harum explicabo possimus animi
                           delectus assumenda, ab quisquam vel? At adipisci
                           quidem dolorum laboriosam quasi, laborum iure,
                           voluptates ullam provident culpa voluptatem quis
                           quos possimus totam animi debitis deserunt nobis
                           quae vero, illo amet.''',
                          price=123,
                          image_file="ex2.jpg",
                          created_on=datetime.utcnow())
    return render_template('product.html', title=product.title, product=product)


@app.route('/saveCart', methods=['GET', 'POST'])
@login_required
def save_cart():
    if request.method == 'POST' and current_user.is_authenticated:
        json_data = request.get_json()
        current_user.cart = [CartItem(product=key, quantity=value) for
                             key, value in json_data.items()]
        current_user.save()
    return 'success'


'''
This part is for development server only, in order to force reloading of
cached files.
'''


@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)


def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            try:
                file_path = os.path.join(app.root_path,
                                        endpoint, filename)
                values['q'] = int(os.stat(file_path).st_mtime)
            except:
                pass
    return url_for(endpoint, **values)
