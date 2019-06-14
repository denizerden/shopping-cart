from mongoengine.fields import StringField, ObjectIdField
from mongoengine.document import Document
from bson.objectid import ObjectId


class Product(Document):
    id = ObjectIdField(required=True)
    title = StringField(required=True)
    description = StringField(required=True)
    price = StringField(required=True)
