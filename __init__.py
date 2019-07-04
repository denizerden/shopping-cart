from flask import Flask
from flask_login import LoginManager
from flask_pymongo import PyMongo
from mongoengine import connect

import routes
from models import User

app = Flask(__name__)
app.config['SECRET_KEY'] = 'd67aee21ea3581a60ed7b2cf43f384a983b2e23ac1cee232'
app.config['MONGO_URI'] = 'mongodb://127.0.0.1:27017/cart'
# db = PyMongo(app).db
connect('products', host=app.config['MONGO_URI'])
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

@login_manager.user_loader
def load_user(user_id):
    return User.objects.get(id=user_id)
