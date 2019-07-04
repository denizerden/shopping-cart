from flask_wtf import FlaskForm
from wtforms import (DecimalField, IntegerField, PasswordField, SelectField,
                     SelectMultipleField, StringField, SubmitField,
                     TextAreaField)
from wtforms.validators import DataRequired, Email, EqualTo, Length
from wtforms.widgets import CheckboxInput, ListWidget


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
