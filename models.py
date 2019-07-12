from flask_login import UserMixin
from mongoengine.document import Document, EmbeddedDocument
from mongoengine.fields import (
    BooleanField, DateTimeField, DecimalField, EmailField,
    EmbeddedDocumentField, EmbeddedDocumentListField, IntField, ListField,
    ObjectIdField, ReferenceField, StringField, LazyReferenceField)


class Option(Document):
    option_id = StringField(required=True)
    option_type = StringField(required=True)
    option_text = StringField(required=True)
    option_value = StringField(required=True)


class Price(Document):
    valid_from = DateTimeField(required=True)
    valid_to = DateTimeField(required=True)
    currency = StringField(required=True)
    original_price = DecimalField(min_value=0, precision=2)
    discounted_price = DecimalField(min_value=0, precision=2)
    discount_rate = DecimalField(min_value=0, max_value=100, precision=4)
    # stock = IntField(min_value=0, required=True)
    # is_active = BooleanField(required=True)
    options = ListField(LazyReferenceField(Option))


class Product(Document):
    title = StringField(required=True)
    description = StringField(required=True)
    image_url = StringField()
    created_on = DateTimeField(auto_now_add=True)
    prices = ListField(LazyReferenceField(Price))


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
