import json
import os
from datetime import datetime
import traceback
from flask import (Response, flash, jsonify, redirect, render_template,
                   request, url_for, make_response)
from flask_login import current_user, login_required, login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash

from __init__ import app
from forms import LoginForm, RegisterForm
from models import CartItem, Product, User, Option, Price
from bson import json_util


@app.route('/', methods=["POST", "GET"])
@app.route('/home', methods=["POST", "GET"])
@login_required
def home():
    return render_template('home.html', products=reversed(Product.objects()))


@app.route('/newproduct', methods=['GET', 'POST'])
# @login_required
def new_product():
    if request.method == 'GET':
        return render_template('newproduct.html')
    else:
        try:
            data = request.get_json()
            prices = []
            for price in data['prices']:
                options = []
                for option_id in price['options']:
                    current_option = data['options'][option_id]
                    options.append(Option(
                        option_id=option_id,
                        option_type=current_option['type'],
                        option_text=current_option['text'],
                        option_value=current_option['value']
                    ).save())
                current = Price(
                    valid_from=datetime.utcnow(),
                    valid_to=datetime.utcnow(),
                    currency=price['currency'],
                    original_price=price['originalPrice'],
                    discounted_price=price['discountedPrice'],
                    discount_rate=price['discountRate'],
                    # stock=price['stock'],
                    # is_active=price['isActive'],
                    options=options
                )
                prices.append(current)
            product = Product(
                title=data['title'],
                description=data['description'],
                image_url=data['imageURL'],
                prices=prices
            ).save()
            return jsonify({'created': str(product.id), 'success': True})
        except Exception as e:
            traceback.print_exc()
            return make_response('An error occured while adding product.', 400)
        return jsonify({'hello': 'world'})


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
    if request.method == 'POST':
        request_data = request.get_json()
        result = []
        for _id, count in request_data.items():
            product = Product.objects.get(id=_id)
            options = {}
            prices = []
            for price in product.prices:
                for option in price.options:
                    options[str(option.id)] = { 'type': option.option_type, 'text': option.option_text, 'value': option.option_value}
                prices.append({
                    'valid_from': price.valid_from,
                    'valid_to': price.valid_to,
                    'currency': price.currency,
                    'original_price': float(price.original_price),
                    'discounted_price': float(price.discounted_price),
                    'discount_rate': float(price.discount_rate),
                    'options': [option.id for option in price.options]
                })
            result.append({
                'id': str(product.id),
                'title': product.title,
                'description': product.description,
                'prices': prices,
                'options': options,
                'image_url': product.image_url,
                'count': count
            })
        return json_util.dumps(result)
    else:
        try:
            product = Product.objects.get(id=product_id)
        except:
            product = None
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
