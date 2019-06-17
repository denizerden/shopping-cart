from flask_login import UserMixin
from mongoengine.document import Document, EmbeddedDocument
from mongoengine.fields import (
    DateTimeField, DecimalField, EmailField, EmbeddedDocumentField,
    EmbeddedDocumentListField, IntField, ListField, ObjectIdField,
    ReferenceField, StringField)


class Product(Document):
    # _id = ObjectIdField(required=True)
    title = StringField(required=True)
    description = StringField(required=True)
    price = DecimalField(required=True, force_string=True)
    image_file = StringField()
    created_on = DateTimeField(required=True)


class CartItem(EmbeddedDocument):
    product_id = ReferenceField(Product, required=True)
    quantity = IntField(required=True)

    def __repr__(self):
        return f'{self.product_id}: {self.quantity}'


class User(Document, UserMixin):
    username = StringField(required=True)
    password = StringField(required=True)
    email = EmailField(required=True)
    profile_picture = StringField(default="default.jpg")
    cart = EmbeddedDocumentListField(CartItem)

{"_id":"5d07c5ea7f74380cb28db167","title":"Slippers","description":"Synthetic\r\nLeather sole\r\nSUPREMELY SOFT SLIPPERS: Classic, luxurious breathable and lightweight stretch satin ballerina house slippers for easy to wear comfort with flexible fit and satin bow adds sophisticated style. Slip pumps and dress shoes off and wear this ballerina slipper for ultimate comfort.\r\nCOTTON BLEND TERRY CUSHION: Indoor house shoe is versatile and supremely soft and breathable and features cotton terry lining for cozy comfort all year round. Foldable and perfect to throw in your bag while traveling or at work.","price":"7.48","image_file":"slippers.jpg","created_on":"2019-06-17T16:55:06.598Z"}