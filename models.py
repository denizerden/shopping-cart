from mongoengine.fields import StringField, ObjectIdField, DateTimeField,\
    DecimalField
from mongoengine.document import Document


class Product(Document):
    # _id = ObjectIdField(required=True)
    title = StringField(required=True)
    description = StringField(required=True)
    price = DecimalField(required=True, force_string=True)
    image_file = StringField()
    created_on = DateTimeField(required=True)
