from mongoengine.fields import StringField, ObjectIdField, DateTimeField
from mongoengine.document import Document
from bson.objectid import ObjectId


class Product(Document):
    _id = ObjectIdField(required=True)
    title = StringField(required=True)
    description = StringField(required=True)
    price = StringField(required=True)
    created_on = DateTimeField(required=True)
