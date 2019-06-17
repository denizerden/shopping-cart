from mongoengine.document import Document, EmbeddedDocument
from mongoengine.fields import (DateTimeField, DecimalField, EmailField,
                                EmbeddedDocumentListField, ListField,
                                ObjectIdField, ReferenceField, StringField)
from flask_login import UserMixin


class Product(Document):
    # _id = ObjectIdField(required=True)
    title = StringField(required=True)
    description = StringField(required=True)
    price = DecimalField(required=True, force_string=True)
    image_file = StringField()
    created_on = DateTimeField(required=True)


class User(Document, UserMixin):
    username = StringField(required=True)
    password = StringField(required=True)
    email = EmailField(required=True)
    profile_picture = StringField(default="default.jpg")
    cart = ListField(ReferenceField(Document), default=[])
