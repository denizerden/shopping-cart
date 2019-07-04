from flask_login import UserMixin
from mongoengine.document import Document, EmbeddedDocument
from mongoengine.fields import (
    DateTimeField, DecimalField, EmailField, EmbeddedDocumentField,
    EmbeddedDocumentListField, IntField, ListField, ObjectIdField,
    ReferenceField, StringField)


class Product(Document):
    title = StringField(required=True)
    description = StringField(required=True)
    price = DecimalField(required=True, force_string=True)
    image_file = StringField()
    created_on = DateTimeField(auto_now_add=True)


class CartItem(EmbeddedDocument):
    product = ReferenceField(Product, required=True)
    quantity = IntField(required=True)

    def __repr__(self):
        return f'{self.product.title}: {self.quantity}'


class User(Document, UserMixin):
    username = StringField(required=True)
    password = StringField(required=True)
    email = EmailField(required=True)
    profile_picture = StringField(default="default.jpg")
    cart = EmbeddedDocumentListField(CartItem)
