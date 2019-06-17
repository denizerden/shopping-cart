from flask_wtf import FlaskForm
from wtforms import (DecimalField, IntegerField, PasswordField, StringField,
                     SubmitField, TextAreaField)
from wtforms.validators import DataRequired, Email, EqualTo, Length


class ProductForm(FlaskForm):
    title = StringField('Title',
                        validators=[DataRequired(), Length(min=2, max=100)])
    description = TextAreaField('Description',
                                validators=[DataRequired(), Length(max=1000)])
    price = DecimalField('Price', validators=[DataRequired()])
    image_file = StringField('Image file', default='default.jpg')
    submit = SubmitField('Save')


class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[
                           DataRequired(), Length(min=2, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[
                             DataRequired(), Length(min=5)])
    confirm_password = PasswordField(
        'Confirm password', validators=[EqualTo('password')])
    submit = SubmitField('Sign up')


class LoginForm(FlaskForm):
    # username = StringField('Username',
    #                        validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')
