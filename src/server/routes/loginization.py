from server import db
from flask import request, Response, jsonify, request, redirect, url_for, session, render_template
from flask_cors import cross_origin
from bson import ObjectId
from werkzeug.exceptions import NotFound, Conflict, InternalServerError
from passlib.hash import pbkdf2_sha256
from . import routes

class User(db.Document):
    name = db.StringField(required=True)
    email = db.StringField(required=True)
    password = db.StringField(required=True)

    def to_json(self):
        return {"id": str(self.id), "name": self.name, "email": self.email, "password": self.password}

@routes.route("/signup", methods=["POST"])
def signup():
    '''
    Registers user with given name, email and password
    Returns: 200

    THROWS: 409 - if user is already registered
            500 - if something went wrong ( with db )
    '''
    name = request.form.get('name')
    email = request.form.get('email')
    password = pbkdf2_sha256.encrypt(request.form.get('password'))

    try:
        if User.objects.get_or_404(email=email):
            return Conflict(description="User is already registered")
    except NotFound:
        user = User(name=name, email=email, password=password).save()
        return Response(status=200)
    return InternalServerError(description="Something went wrong")

@routes.route("/signout", methods=["POST"])
def signout():
    session.clear()
    return redirect('/')