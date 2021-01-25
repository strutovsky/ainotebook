from server import db
from flask import request, Response
from . import routes

class Pages(db.EmbeddedDocument):
    title = db.StringField(required=True)
    date = db.StringField()
    text = db.StringField()
    metadata = db.StringField()

class Notebook(db.Document):
    name = db.StringField(required=True)
    pages = db.ListField(db.EmbeddedDocumentField(Pages))

    def to_json(self):
        return {"name": self.name, "pages": self.pages}


@routes.route("/notebooks", methods=["POST"])
def create_notebook():
    body = request.get_json()
    notebook = Notebook(**body).save()
    id = notebook.id
    return {"id": str(id)}, 200


@routes.route("/notebooks", methods=["GET"])
def get_all_notebooks():
    notebooks = Notebook.objects().to_json()
    return Response(notebooks, mimetype="application/json", status=200)


@routes.route("/notebooks/<id>", methods=["GET"])
def get_notebook_by_id(id):
    body = request.get_json()
    notebook = Notebook.objects.get(id=id)
    return notebook.to_json()

@routes.route("/notebooks/<id>/pages", methods=["GET"])
def get_notebook_pages(id):
    body = request.get_json()
    notebook = Notebook.objects.get(id=id)
    return notebook.to_json()["pages"]      #TODO: list response